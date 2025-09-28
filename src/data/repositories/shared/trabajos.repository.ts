import { UUID } from "crypto";
import { pool } from "../../../config/db";
import { PerfilEmpresa } from "../../../interfaces/perfil.enterprise.interface";
import { CustomError } from "../../../utils/CustomError";

export const TrabajosRepository = {
  async getTrabajosByPerfilId(id_perfil: number) {
    console.log("id perfil:", id_perfil);
    const result = await pool.query("SELECT * FROM trabajos WHERE id_perfil=$1", [id_perfil]);

    if (result.rows.length === 0) {
      throw new CustomError(404, 'No se encontraron trabajos para el perfil dado');
    }
    return result.rows;
  },

};
