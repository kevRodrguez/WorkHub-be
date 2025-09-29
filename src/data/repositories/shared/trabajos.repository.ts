import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import { Trabajo } from "../../../interfaces";

export const TrabajosRepository = {
  async getTrabajos(): Promise<Trabajo[]> {
    const result = await pool.query(
      "SELECT * FROM trabajos WHERE fecha_expiracion >= NOW() ORDER BY fecha_expiracion ASC;"
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontraron trabajos para el perfil dado"
      );
    }

    return result.rows;
  },

  async getTrabajosByPerfilId(id_perfil: number) {
    const result = await pool.query(
      "SELECT * FROM trabajos WHERE id_perfil=$1 AND fecha_expiracion >= NOW()",
      [id_perfil]
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontraron trabajos para el perfil dado"
      );
    }

    return result.rows;
  },
};
