import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import { Trabajo } from "../../../interfaces";

export const NotificacionesRepository = {



  async postNotificacion(id_destinatario: number, tipo: string, mensaje: string) {

    try {
      const result = await pool.query(
        "INSERT INTO notificaciones (id_destinatario, tipo, mensaje, leido, enviado_en) VALUES  ($1, $2, $3, false, NOW())",
        [id_destinatario, tipo, mensaje]
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error al insertar notificación:", error);
    }
  },

};
