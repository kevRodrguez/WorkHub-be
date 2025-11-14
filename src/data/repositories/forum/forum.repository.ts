import { pool } from "../../../config/db";
import { Foro } from "../../../interfaces/forum.interface";

export const ForosRepository = {
  async getForos(): Promise<Foro[]> {
    const result = await pool.query(`
    SELECT f.*, p.nombre AS nombre_usuario, p.link_foto_perfil
    FROM foros f
    JOIN perfiles p ON f.id_perfil = p.id_perfil
    ORDER BY f.fecha DESC
    `);
    return result.rows as Foro[];
  },

  async getForoById(id: number): Promise<Foro | null> {
    const result = await pool.query("SELECT * FROM foros WHERE id_foro = $1", [
      id,
    ]);
    return result.rows[0] || null;
  },

  async getForosByUserId(id: number): Promise<Foro[] | null> {
    const result = await pool.query(`
    SELECT f.*, p.nombre AS nombre_usuario, p.link_foto_perfil
    FROM foros f WHERE f.id_perfil = $1
    JOIN perfiles p ON f.id_perfil = p.id_perfil
    ORDER BY f.fecha DESC
    `, [id]);
    return result.rows || null;
  },

  async crearForo(
    id_categoria: number,
    id_perfil: number,
    titulo: string,
    contenido: string,
    fecha: Date
  ): Promise<Foro> {
    const result = await pool.query(
      "INSERT INTO foros (id_categoria, id_perfil, titulo, contenido, fecha) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_categoria, id_perfil, titulo, contenido, fecha]
    );
    return result.rows[0];
  },

  async actualizarContenidoForo(
    id_foro: number,
    contenido: string
  ): Promise<Foro | null> {
    const result = await pool.query(
      "UPDATE foros SET contenido = $1 WHERE id_foro = $2 RETURNING *",
      [contenido, id_foro]
    );
    return result.rows[0] || null;
  },

  async eliminarForo(id_foro: number): Promise<Foro | null> {
    const result = await pool.query("DELETE FROM foros WHERE id_foro = $1", [
      id_foro,
    ]);
    return result.rows[0] || null;
  },
};
