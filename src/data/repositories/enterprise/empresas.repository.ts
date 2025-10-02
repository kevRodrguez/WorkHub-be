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
      pe.id_perfil AS id_seguido,
      pe.nombre AS nombre_seguido, 
      pe.link_foto_perfil as foto_seguido, 
      pe.ubicacion AS ubicacion_seguido,
      se.id_seguidor,
      CASE 
      WHEN se.id_seguidor IS NULL THEN FALSE
      ELSE TRUE
      END AS es_seguida
      FROM perfiles pe
      LEFT JOIN seguidores_empresas se ON se.id_seguido = pe.id_perfil
      WHERE rol = 'empresa' AND id_perfil != $1`;

    const result = await pool.query(query, [id_empresa]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron empresas");
    }
    return result.rows;
  }


};
