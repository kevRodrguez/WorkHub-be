import { UUID } from "crypto";
import { pool } from "../../../config/db";
import { DataTrabajosAplicados, Perfil } from "../../../interfaces";

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


  async getTrabajosAplicados(id_usuario: UUID): Promise<DataTrabajosAplicados[]> {
    const result = await pool.query(
      `SELECT
        a.id_aplicacion,
        u.id           AS id_usuario,
        a.id_candidato,
        a.id_trabajo,


        p.link_foto_perfil,
        t.nombre_trabajo,
        t.modalidad,
        t.ubicacion,
        t.salario_minimo,
        t.salario_maximo,
        t.fecha_expiracion,
        a.estado AS estado_aplicacion,


        t.id_perfil        AS id_perfil_empresa,
        emp.nombre         AS nombre_empresa,
        emp.link_foto_perfil AS logo_empresa,
        t.estado           AS estado_trabajo,
        a.mensaje,
        a.id_curriculum
      FROM public.aplicaciones a
      JOIN public.trabajos t      ON t.id_trabajo = a.id_trabajo
      LEFT JOIN public.perfiles emp ON emp.id_perfil = t.id_perfil
      JOIN public.perfiles p      ON p.id_perfil = a.id_candidato
      JOIN auth.users u           ON u.id = p.id_usuario
      WHERE u.id = $1
      ORDER BY a.id_aplicacion DESC;`,
      [id_usuario]
    );

    return result.rows;
  },

  async getTopTrabajosAplicados(id_usuario: UUID): Promise<DataTrabajosAplicados[]> {
    const result = await pool.query(
      `SELECT
        a.id_aplicacion,
        u.id           AS id_usuario,
        a.id_candidato,
        a.id_trabajo,

        p.link_foto_perfil,
        t.nombre_trabajo,
        t.modalidad,
        t.ubicacion,
        t.salario_minimo,
        t.salario_maximo,
        t.fecha_expiracion,
        a.estado AS estado_aplicacion,

        t.id_perfil        AS id_perfil_empresa,
        emp.nombre         AS nombre_empresa,
        emp.link_foto_perfil AS logo_empresa,
        t.estado           AS estado_trabajo,
        a.mensaje,
        a.id_curriculum
      FROM public.aplicaciones a
      JOIN public.trabajos t       ON t.id_trabajo = a.id_trabajo
      LEFT JOIN public.perfiles emp ON emp.id_perfil = t.id_perfil
      JOIN public.perfiles p       ON p.id_perfil = a.id_candidato
      JOIN auth.users u            ON u.id = p.id_usuario
      WHERE u.id = $1
      ORDER BY t.fecha_expiracion ASC NULLS LAST, a.id_aplicacion DESC
      LIMIT 3;`,
      [id_usuario]
    );

    return result.rows;
  },

  async getProfileStats(id_usuario: UUID) {
    const result = await pool.query(`
      SELECT
      (SELECT COUNT(*)
      FROM public.aplicaciones a
      JOIN public.perfiles p ON p.id_perfil = a.id_candidato
      WHERE p.id_usuario = $1
      ) AS aplicaciones_count,

      (SELECT COUNT(*)
      FROM public.favoritos f
      JOIN public.perfiles p2 ON p2.id_perfil = f.id_perfil
      WHERE p2.id_usuario = $1
      ) AS favoritos_count,

      (SELECT COUNT(*)
      FROM public.notificaciones n
      JOIN public.perfiles p3 ON p3.id_perfil = n.id_destinatario
      WHERE p3.id_usuario = $1
        AND n.leido = false
      ) AS alertas_trabajo_count;
      `, [id_usuario]);

    return result.rows[0];
  },

  async getTrabajosFavoritos(id_usuario: UUID): Promise<DataTrabajosAplicados[]> {
    const result = await pool.query(`
    SELECT
      f.id_favorito,
      u.id                     AS id_usuario,
      f.id_perfil              AS id_perfil_usuario,
      f.id_trabajo,

      p.link_foto_perfil,

      t.nombre_trabajo,
      t.modalidad,
      t.ubicacion,
      t.salario_minimo,
      t.salario_maximo,
      t.fecha_expiracion,

      t.estado                 AS estado_trabajo,

      t.id_perfil              AS id_perfil_empresa,
      emp.nombre               AS nombre_empresa,
      emp.link_foto_perfil     AS logo_empresa
    FROM public.favoritos f
    JOIN public.perfiles p       ON p.id_perfil = f.id_perfil
    JOIN auth.users u            ON u.id = p.id_usuario
    JOIN public.trabajos t       ON t.id_trabajo = f.id_trabajo
    LEFT JOIN public.perfiles emp ON emp.id_perfil = t.id_perfil
    WHERE u.id = $1 -- '67158c53-7a28-4719-b169-93deb9450427'
    ORDER BY t.fecha_expiracion DESC NULLS LAST, f.id_favorito DESC;`,
      [id_usuario]
    );

    return result.rows;
  },

  async getAlertasTrabajo(id_usuario: UUID) {
    const result = await pool.query(
      `
      SELECT
        n.id_notificacion,
        n.tipo,
        n.mensaje,
        n.leido,
        n.enviado_en,
        n.id_aplicacion,

        a.id_trabajo,
        t.nombre_trabajo,
        t.modalidad,
        t.ubicacion,
        t.salario_minimo,
        t.salario_maximo,
        t.fecha_expiracion,
        t.estado                 AS estado_trabajo,

        emp.id_perfil            AS id_perfil_empresa,
        emp.nombre               AS nombre_empresa,
        emp.link_foto_perfil     AS logo_empresa
      FROM public.notificaciones n
      JOIN public.perfiles dest    ON dest.id_perfil = n.id_destinatario
      JOIN auth.users u            ON u.id = dest.id_usuario
      LEFT JOIN public.aplicaciones a ON a.id_aplicacion = n.id_aplicacion
      LEFT JOIN public.trabajos t      ON t.id_trabajo   = a.id_trabajo
      LEFT JOIN public.perfiles emp    ON emp.id_perfil  = t.id_perfil
      WHERE u.id = $1
        AND n.id_aplicacion IS NOT NULL
      ORDER BY
        COALESCE(n.leido, false) ASC,   -- no leídas primero
        n.enviado_en DESC NULLS LAST,
        n.id_notificacion DESC;
      `,
      [id_usuario]);

    return result.rows;
  },

  async actualizarEstadoNotificacion(id_notificacion: number, leido: boolean): Promise<any> {
    const result = await pool.query(
      `UPDATE notificaciones
       SET leido = $2
       WHERE id_notificacion = $1
       RETURNING *`,
      [id_notificacion, leido]
    );

    return result.rows[0] || null;
  },

  async eliminarFavorito(id_favorito: number): Promise<any> {
    const result = await pool.query(
      `DELETE FROM favoritos
       WHERE id_favorito = $1
       RETURNING *`,
      [id_favorito]
    );

    return result.rows[0] || null;
  }
};
