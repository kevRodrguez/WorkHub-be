import { pool } from "../../../config/db";
import { Blog } from "../../../interfaces/blog.interface";

export const BlogRepository = {
  async getBlogs(): Promise<Blog[]> {
    const result = await pool.query("SELECT * FROM blogs ORDER BY fecha");
    return result.rows as Blog[];
  },

  async getBlogById(id_blog: number): Promise<Blog> {
    const result = await pool.query(    `
    SELECT b.*, 
           p.nombre AS nombre_usuario, 
           p.link_foto_perfil
    FROM blogs b
    JOIN perfiles p ON b.id_perfil = p.id_perfil
    WHERE b.id_blog = $1
    `, [
      id_blog,
    ]);
    return result.rows[0];
  },

  async createBlog(
    id_perfil: number,
    id_categoria: number,
    link_miniatura: string,
    titulo: string,
    contenido: string,
    fecha: Date
  ): Promise<Blog> {
    const result = await pool.query(
      "INSERT INTO blogs (id_perfil, id_categoria, link_miniatura, titulo, contenido, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id_perfil, id_categoria, link_miniatura, titulo, contenido, fecha]
    );
    return result.rows[0];
  },

  async actualizarBlog(
    id_blog: number,
    id_categoria: number,
    id_perfil: number,
    link_miniatura: string,
    titulo: string,
    contenido: string,
    fecha: Date
  ): Promise<Blog> {
    const result = await pool.query(
      "UPDATE blogs SET id_categoria = $2, id_perfil = $3, link_miniatura = $4, titulo = $5, contenido =$6, fecha = $7 WHERE id_blog = $1)",
      [
        id_blog,
        id_categoria,
        id_perfil,
        link_miniatura,
        titulo,
        contenido,
        fecha,
      ]
    );
    return result.rows[0] || null;
  },

  async eliminarForo(id_blog: number): Promise<Blog | null> {
    const result = await pool.query("DELETE FROM blogs WHERE id_blog = $1", [
      id_blog,
    ]);
    return result.rows[0] || null;
  },
};
