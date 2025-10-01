import { UUID } from "crypto";
import { pool } from "../../../config/db";
import { Perfil } from "../../../interfaces";

export const PerfilesRepository = {
  async getPerfiles(): Promise<Perfil[]> {
    const result = await pool.query(
      "SELECT * FROM perfiles ORDER BY id_perfil"
    );

    return result.rows;
  },

  async getPerfilById(id: UUID): Promise<Perfil | null> {
    const result = await pool.query(
      "SELECT * FROM perfiles WHERE id_usuario = $1",
      [id]
    );

    return result.rows[0] || null;
  },

  async insertarPerfil(
    id_usuario: number,
    nombre: string,
    genero: string,
    estado_civil: string,
    experiencia: string,
    educacion: string,
    biografia: string,
    fecha_nacimiento_fundacion: Date,
    telefono: string,
    ubicacion: string,
    email: string,
    pagina_web: string,
    red_social: string,
    rol: string,
    link_foto_perfil: string,
  ): Promise<Perfil> {
    const result = await pool.query(
      `INSERT INTO perfiles 
      (id_usuario, nombre, genero, estado_civil, experiencia, educacion, biografia, fecha_nacimiento_fundacion, telefono, ubicacion, email, pagina_web, red_social, rol, link_foto_perfil)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        id_usuario,
        nombre,
        genero,
        estado_civil,
        experiencia,
        educacion,
        biografia,
        fecha_nacimiento_fundacion,
        telefono,
        ubicacion,
        email,
        pagina_web,
        red_social,
        rol,
        link_foto_perfil,
      ]
    );

    return result.rows[0];
  },

  async actualizarPerfil(
    id_usuario: UUID,
    nombre: string,
    genero: string,
    estado_civil: string,
    experiencia: string,
    educacion: string,
    biografia: string,
    fecha_nacimiento_fundacion: Date,
    telefono: string,
    ubicacion: string,
    email: string,
    pagina_web: string,
    red_social: string,
    rol: string,
    link_foto_perfil: string,
  ): Promise<Perfil | null> {
    const result = await pool.query(
      `UPDATE perfiles SET 
      nombre = $1, genero = $2, estado_civil = $3, experiencia = $4, educacion = $5, biografia = $6, fecha_nacimiento_fundacion = $7, telefono = $8, ubicacion = $9, email = $10, pagina_web = $11, red_social = $12, rol = $13, link_foto_perfil = $14
      WHERE id_usuario = $15 RETURNING *`,
      [
        nombre,
        genero,
        estado_civil,
        experiencia,
        educacion,
        biografia,
        fecha_nacimiento_fundacion,
        telefono,
        ubicacion,
        email,
        pagina_web,
        red_social,
        rol,
        link_foto_perfil,
        id_usuario,
      ]
    );

    return result.rows[0] || null;
  },

  async eliminarPerfil(id_usuario: UUID): Promise<Perfil | null> {
    const result = await pool.query(
      "DELETE FROM perfiles WHERE id_usuario = $1 RETURNING *",
      [id_usuario]
    );

    return result.rows[0] || null;
  },
};
