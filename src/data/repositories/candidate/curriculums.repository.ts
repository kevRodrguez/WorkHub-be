import { pool } from "../../../config/db";
import { Curriculum, CrearCurriculumDTO } from "../../../interfaces";

export const CurriculumsRepository = {
  async getCurriculums(): Promise<Curriculum[]> {
    const result = await pool.query(
      "SELECT * FROM curriculums ORDER BY fecha_subida DESC"
    );
    return result.rows;
  },

  async getCurriculumsByPerfilId(id_perfil: number): Promise<Curriculum[]> {
    const result = await pool.query(
      `SELECT 
        id_curriculum,
        id_perfil,
        url_curriculum,
        nombre_archivo,
        tamano_archivo,
        fecha_subida
      FROM curriculums 
      WHERE id_perfil = $1 
      ORDER BY fecha_subida DESC`,
      [id_perfil]
    );
    return result.rows;
  },

  async countCurriculumsByPerfilId(id_perfil: number): Promise<number> {
    const result = await pool.query(
      "SELECT COUNT(*) as total FROM curriculums WHERE id_perfil = $1",
      [id_perfil]
    );
    return parseInt(result.rows[0].total, 10);
  },

  async getCurriculumById(id_curriculum: number): Promise<Curriculum | null> {
    const result = await pool.query(
      "SELECT * FROM curriculums WHERE id_curriculum = $1",
      [id_curriculum]
    );

    return result.rows[0] || null;
  },

  async insertarCurriculum(datos: CrearCurriculumDTO): Promise<Curriculum> {
    const result = await pool.query(
      `INSERT INTO curriculums (
        id_perfil, 
        url_curriculum, 
        nombre_archivo, 
        tamano_archivo
      ) VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [
        datos.id_perfil,
        datos.url_curriculum,
        datos.nombre_archivo,
        datos.tamano_archivo,
      ]
    );

    return result.rows[0];
  },

  async actualizarNombreCurriculum(
    id_curriculum: number,
    nombre_archivo: string
  ): Promise<Curriculum | null> {
    const result = await pool.query(
      `UPDATE curriculums 
      SET nombre_archivo = $1 
      WHERE id_curriculum = $2 
      RETURNING *`,
      [nombre_archivo, id_curriculum]
    );

    return result.rows[0] || null;
  },

  async eliminarCurriculum(id_curriculum: number): Promise<Curriculum | null> {
    const result = await pool.query(
      "DELETE FROM curriculums WHERE id_curriculum = $1 RETURNING *",
      [id_curriculum]
    );

    return result.rows[0] || null;
  },
};
