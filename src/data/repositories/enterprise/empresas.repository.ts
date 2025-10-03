import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import {
  ActualizarTrabajoDTO,
  CrearTrabajoDTO,
  Trabajo,
} from "../../../interfaces";

export const EmpresasRepository = {
  async getEmpresas(id_empresa: number) {
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

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron empresas");
    }
    return result.rows;
  }


};
