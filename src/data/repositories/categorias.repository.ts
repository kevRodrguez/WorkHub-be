import { pool } from "../../config/db";

export const CategoriasRepository = {
  async getCategorias() {
    const result = await pool.query(
      "SELECT * FROM categorias ORDER BY id_categoria"
    );

    return result.rows;
  },
};
