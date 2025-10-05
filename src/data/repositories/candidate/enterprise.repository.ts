import { pool } from "../../../config/db";

export const EnterpriseRepository = {
  async getEnterprises(): Promise<any[]> {
    const result = await pool.query(
      "SELECT * FROM perfiles WHERE rol = 'empresa' ORDER BY id_perfil"
    );

    return result.rows;
  },
};
