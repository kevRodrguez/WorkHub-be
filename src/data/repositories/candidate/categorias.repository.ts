import { pool } from "../../../config/db";
import { Categoria } from "../../../interfaces";

export const CategoriasRepository = {
  async getCategorias(): Promise<Categoria[]> {
    const result = await pool.query(
      "SELECT * FROM categorias ORDER BY id_categoria"
    );

    return result.rows;
  },

  async getCategoriaById(id: number): Promise<Categoria | null> {
    const result = await pool.query(
      "SELECT * FROM categorias WHERE id_categoria = $1",
      [id]
    );

    return result.rows[0] || null;
  },

  async insertarCategoria(nombre_categoria: string, descripcion: string): Promise<Categoria> {
    const result = await pool.query(
      "INSERT INTO categorias (nombre_categoria, descripcion) VALUES ($1, $2) RETURNING *",
      [nombre_categoria, descripcion]
    );

    return result.rows[0];
  },

  async actualizarCategoria(
    id_categoria: number,
    nombre_categoria: string,
    descripcion: string
  ): Promise<Categoria | null> {
    const result = await pool.query(
      "UPDATE categorias SET nombre_categoria = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *",
      [nombre_categoria, descripcion, id_categoria]
    );

    return result.rows[0] || null;
  },

  async eliminarCategoria(id_categoria: number): Promise<Categoria | null> {
    const result = await pool.query(
      "DELETE FROM categorias WHERE id_categoria = $1 RETURNING *",
      [id_categoria]
    );

    return result.rows[0] || null;
  },
};
