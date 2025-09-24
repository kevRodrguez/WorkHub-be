import { pool } from "../../../config/db";
import { Curriculum } from "../../../interfaces";

export const CurriculumsRepository = {
  async getCurriculums(): Promise<Curriculum[]> {
    const result = await pool.query(
      "SELECT * FROM curriculums ORDER BY id_curriculum"
    );
    return result.rows;
  },

  async getCurriculumById(id_curriculum: number): Promise<Curriculum | null> {
    const result = await pool.query(
      "SELECT * FROM curriculums WHERE id_curriculum = $1",
      [id_curriculum]
    );

    return result.rows[0] || null;
  },

  async insertarCurriculum(
    id_perfil: number,
    url_curriculum: string
  ): Promise<Curriculum> {
    const result = await pool.query(
      `INSERT INTO curriculums (id_perfil, url_curriculum) 
       VALUES ($1, $2) RETURNING *`,
      [id_perfil, url_curriculum]
    );

    return result.rows[0];
  },

  async actualizarCurriculum(
    id_curriculum: number,
    url_curriculum: string
  ): Promise<Curriculum | null> {
    const result = await pool.query(
      `UPDATE curriculums 
      SET url_curriculum = $1 
      WHERE id_curriculum = $2 
      RETURNING *`,
      [url_curriculum, id_curriculum]
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
