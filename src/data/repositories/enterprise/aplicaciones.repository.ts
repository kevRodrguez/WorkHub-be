import { UUID } from "crypto";
import { pool } from "../../../config/db";
import { PerfilEmpresa } from "../../../interfaces/perfil.enterprise.interface";
import { CustomError } from "../../../utils/CustomError";

export const AplicacionesEnterpriseRepository = {
  async getAplicacionesByIdTrabajo(id_trabajo: number): Promise<any[]> {
    console.log("ID Trabajo en el repositorio:", id_trabajo); // Verifica que el ID se recibe correctamente
    const query = `
      SELECT 
        p.id_perfil,
        ap.id_trabajo,
        p.nombre,
        t.nombre_trabajo,
        p.ubicacion,
        p.experiencia,
        p.educacion,
        p.genero,
        ap.estado,
        p.estado_civil,
        p.fecha_nacimiento_fundacion,
        cv.url_curriculum,
        p.email,
        p.pagina_web,
        p.telefono,
        p.biografia,
        p.red_social
      FROM aplicaciones ap
      JOIN perfiles p ON p.id_perfil = ap.id_candidato
      JOIN trabajos t ON t.id_trabajo = ap.id_trabajo
      JOIN curriculums cv ON cv.id_perfil = p.id_perfil
      WHERE ap.id_trabajo = $1;
    `;
    const result = await pool.query(query, [id_trabajo]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron aplicaciones para este trabajo");
    }
    return result.rows;
  },


};
