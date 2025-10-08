import { pool } from "../../../config/db";

export const EnterpriseRepository = {
  async getEnterprises(): Promise<any[]> {
    const result = await pool.query(
      "SELECT * FROM perfiles WHERE rol = 'empresa' ORDER BY id_perfil"
    );

    for (const row of result.rows) {
      const seguidoresQuery = `
      SELECT 
        pe.nombre
      FROM perfiles 
      JOIN seguidores_empresas se ON se.id_seguido = perfiles.id_perfil
      JOIN perfiles pe ON pe.id_perfil = se.id_seguidor
      WHERE perfiles.id_perfil = $1
      `;
      const seguidoresResult = await pool.query(seguidoresQuery, [
        row.id_perfil,
      ]);
      row.seguidores = seguidoresResult.rows;
    }

    return result.rows;
  },
};
