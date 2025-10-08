import { get } from "http";
import { pool } from "../../../config/db";
import { Comentario } from "../../../interfaces/comentario.interface";
export const ComentarioRepository = {
  async getComentarios(): Promise<Comentario[]> {
    const result = await pool.query("SELECT * FROM comentarios ORDER BY fecha");
    return result.rows as Comentario[];
  },

  async getComentarioById(id_comentario: number): Promise<Comentario> {
    const result = await pool.query(
      "SELECT * FROM comentarios WHERE id_comentario = $1",
      [id_comentario]
    );
    return result.rows[0];
  },


  async getComentariosByBlog(id_blog: number): Promise<Comentario[]> {
    const result = await pool.query(
          `
    SELECT c.*, 
           p.nombre AS nombre_usuario, 
           p.link_foto_perfil
    FROM comentarios c
    JOIN perfiles p ON c.id_perfil = p.id_perfil
    WHERE c.id_blog = $1
    ORDER BY c.fecha
    `,
      [id_blog]
    );
    return result.rows as Comentario[];
  },

  async createComentario(
    id_perfil: number,
    id_blog: number,
    contenido: string,
    fecha: Date
  ): Promise<Comentario> {
    const result = await pool.query(
      "INSERT INTO comentarios (id_perfil, id_blog, contenido, fecha) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_perfil, id_blog, contenido, fecha]
    );
    return result.rows[0];
  },

  async actualizarComentario(
    id_comentario: number,
    contenido: string,
    fecha: Date
  ): Promise<Comentario> {
    const result = await pool.query(
      "UPDATE comentarios SET contenido = $1, fecha = $2 WHERE id_comentario = $3 RETURNING *",
      [contenido, fecha, id_comentario]
    );
    return result.rows[0] || null;
  },

  async eliminarComentario(id_comentario: number): Promise<Comentario | null> {
    const result = await pool.query(
      "DELETE FROM comentarios WHERE id_comentario = $1",
      [id_comentario]
    );
    return result.rows[0] || null;
  },
};
