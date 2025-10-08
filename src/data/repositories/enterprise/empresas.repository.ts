import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import {
  ActualizarTrabajoDTO,
  CrearTrabajoDTO,
  Trabajo,
} from "../../../interfaces";

export const EmpresasRepository = {
  async getEmpresas(id_empresa: number) {


    //obtener 
    const query = `SELECT
      pe.id_perfil                          AS id_seguido,
      pe.nombre                             AS nombre_seguido,
      pe.link_foto_perfil                   AS foto_seguido,
      pe.ubicacion                          AS ubicacion_seguido,
      EXISTS (
      SELECT 1
      FROM seguidores_empresas se
      WHERE se.id_seguido = pe.id_perfil
        AND se.id_seguidor = $1
      )                                     AS es_seguida,
      EXISTS (
      SELECT 1
      FROM seguidores_empresas se
      WHERE se.id_seguido = $1
        AND se.id_seguidor = pe.id_perfil
      )                                     AS te_sigue
    FROM perfiles pe
    WHERE pe.rol = 'empresa'
      AND pe.id_perfil != $1`;


    const result = await pool.query(query, [id_empresa]);

    // Para cada empresa, obtener las empresas que la siguen
    for (const row of result.rows) {
      const seguidoresQuery = `
      SELECT 
        pe.nombre
      FROM perfiles 
      JOIN seguidores_empresas se ON se.id_seguido = perfiles.id_perfil
      JOIN perfiles pe ON pe.id_perfil = se.id_seguidor
      WHERE perfiles.id_perfil = $1
      `;
      const seguidoresResult = await pool.query(seguidoresQuery, [row.id_seguido]);
      row.seguidores = seguidoresResult.rows;
    }

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron empresas");
    }
    return result.rows;
  },


  async seguirEmpresa(id_seguidor: number, id_seguido: number) {
    const query = `
      INSERT INTO seguidores_empresas (id_seguidor, id_seguido)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [id_seguidor, id_seguido]);
    return result.rows[0];
  },

  async dejarDeSeguirEmpresa(id_seguidor: number, id_seguido: number) {
    // Verifica si existen ambos perfiles (empresa y seguidor)
    const checkQuery = `
      SELECT id_perfil
      FROM perfiles
      WHERE id_perfil = $1 OR id_perfil = $2
    `;

    console.log(id_seguidor, id_seguido);
    const checkResult = await pool.query(checkQuery, [id_seguidor, id_seguido]);
    if (checkResult.rows.length < 2) {
      throw new CustomError(404, "No se encontró alguna de las empresas");
    }

    const query = `
      DELETE FROM seguidores_empresas
      WHERE id_seguidor = $1 AND id_seguido = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [id_seguidor, id_seguido]);

    console.log(result)
    if (result.rowCount === 0) {
      throw new CustomError(404, "No se encontró la relación para eliminar");
    }
    return result.rows[0];
  }
};

