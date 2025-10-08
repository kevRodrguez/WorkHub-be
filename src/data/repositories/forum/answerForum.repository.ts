import { pool } from "../../../config/db";
import { Respuesta } from "../../../interfaces/anwserForum.interface";

export const RespuestaRepository = {
  async getRespuestas(): Promise<Respuesta[]> {
    const result = await pool.query(
      "SELECT * FROM respuestas_foros ORDER BY fecha"
    );
    return result.rows as Respuesta[];
  },

  async getRespuestasByForoId(id_foro: number): Promise<Respuesta[]> {
    const result = await pool.query(
      `
      SELECT 
        rf.*, 
        p.nombre AS nombre_usuario,
        p.link_foto_perfil
    FROM respuestas_foros rf
    JOIN perfiles p ON rf.id_perfil = p.id_perfil
    WHERE rf.id_foro = $1
    ORDER BY rf.fecha

        `,
      [id_foro]
    );
    return result.rows as Respuesta[];
  },

  async getRespuestaById(id: number): Promise<Respuesta | null> {
    const result = await pool.query(
      "SELECT * FROM respuestas_foros WHERE id_respuesta_foro = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async getRespuestasByUserId(user_id: number): Promise<Respuesta[]> {
    const result = await pool.query(
      "SELECT * FROM respuestas_foros WHERE id_perfil = $1",
      [user_id]
    );
    return result.rows || null;
  },

  async crearRespuesta(
    id_foro: number,
    id_perfil: number,
    contenido: string,
    fecha: Date
  ): Promise<Respuesta> {
    console.log("Insertando respuesta:", {
      id_foro,
      id_perfil,
      contenido,
      fecha,
    });
    const result = await pool.query(
      "INSERT INTO respuestas_foros (id_foro, id_perfil, contenido, fecha) VALUES ($1, $2, $3, $4) RETURNING *",
      [id_foro, id_perfil, contenido, fecha]
    );
    return result.rows[0];
  },

  async actualizarRespuesta(
    id_respuesta_foro: number,
    contenido: string,
    fecha: Date
  ): Promise<Respuesta | null> {
    const result = await pool.query(
      "UPDATE respuestas_foros SET contenido=$2, fecha=$3 WHERE id_respuesta_foro = $1 RETURNING *",
      [id_respuesta_foro, contenido, fecha]
    );
    return result.rows[0] || null;
  },

  async eliminarRespuesta(id_respuesta: number): Promise<Respuesta | null> {
    const result = await pool.query(
      "DELETE FROM respuestas_foros WHERE id_respuesta_foro = $1",
      [id_respuesta]
    );
    return result.rows[0] || null;
  },
};
