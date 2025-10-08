import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import { Trabajo, TrabajoConDetalles, TrabajoConEmpresa, Favorito } from "../../../interfaces";

export const TrabajosRepository = {
  async getTrabajos(): Promise<Trabajo[]> {
    const result = await pool.query(
      "SELECT * FROM trabajos WHERE fecha_expiracion >= NOW() ORDER BY fecha_expiracion ASC;"
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontraron trabajos para el perfil dado"
      );
    }

    return result.rows;
  },

  async getTrabajosByPerfilId(id_perfil: number) {
    const result = await pool.query(
      "SELECT * FROM trabajos WHERE id_perfil=$1 AND fecha_expiracion >= NOW()",
      [id_perfil]
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontraron trabajos para el perfil dado"
      );
    }

    return result.rows;
  },

  async getTrabajosActivos(): Promise<TrabajoConEmpresa[]> {
    const result = await pool.query(
      `SELECT 
        t.*,
        emp.nombre AS nombre_empresa,
        emp.link_foto_perfil AS logo_empresa
      FROM trabajos t
      LEFT JOIN perfiles emp ON emp.id_perfil = t.id_perfil AND emp.rol = 'empresa'
      WHERE t.fecha_expiracion >= NOW() AND t.estado = TRUE 
      ORDER BY t.fecha_expiracion ASC;`
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontraron trabajos activos"
      );
    }

    return result.rows.map(row => ({
      id_trabajo: row.id_trabajo,
      id_perfil: row.id_perfil,
      id_categoria: row.id_categoria,
      nombre_trabajo: row.nombre_trabajo,
      descripcion: row.descripcion,
      responsabilidades: row.responsabilidades,
      salario_minimo: row.salario_minimo,
      salario_maximo: row.salario_maximo,
      modalidad: row.modalidad,
      educacion: row.educacion,
      experiencia: row.experiencia,
      fecha_expiracion: row.fecha_expiracion,
      fecha_publicacion: row.fecha_publicacion,
      nivel: row.nivel,
      ubicacion: row.ubicacion,
      cupos: row.cupos,
      estado: row.estado,
      aplicar_por: row.aplicar_por,
      nombre_empresa: row.nombre_empresa,
      logo_empresa: row.logo_empresa,
    }));
  },

  async getTrabajosById(id_trabajo: number): Promise<TrabajoConDetalles[]> {
    const result = await pool.query(
      `SELECT 
        t.*,
        
        -- Información de la empresa
        p.id_perfil as empresa_id_perfil,
        p.nombre as empresa_nombre,
        p.biografia as empresa_biografia,
        p.link_foto_perfil as empresa_link_foto_perfil,
        p.email as empresa_email,
        p.telefono as empresa_telefono,
        p.ubicacion as empresa_ubicacion,
        p.pagina_web as empresa_pagina_web,
        p.red_social as empresa_red_social,
        p.fecha_nacimiento_fundacion as empresa_fecha_nacimiento_fundacion,
        
        -- Información de la categoría
        c.id_categoria as categoria_id_categoria,
        c.nombre_categoria as categoria_nombre_categoria,
        c.descripcion as categoria_descripcion
        
      FROM trabajos t
      LEFT JOIN perfiles p ON t.id_perfil = p.id_perfil AND p.rol = 'empresa'
      LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
      WHERE t.fecha_expiracion >= NOW() AND t.id_trabajo = $1
      ORDER BY t.fecha_expiracion ASC;`,
      [id_trabajo]
    );

    if (result.rows.length === 0) {
      throw new CustomError(
        404,
        "No se encontró el trabajo solicitado"
      );
    }

    // Transformar los datos para incluir los objetos anidados
    return result.rows.map(row => ({
      id_trabajo: row.id_trabajo,
      id_perfil: row.id_perfil,
      id_categoria: row.id_categoria,
      nombre_trabajo: row.nombre_trabajo,
      descripcion: row.descripcion,
      responsabilidades: row.responsabilidades,
      salario_minimo: row.salario_minimo,
      salario_maximo: row.salario_maximo,
      modalidad: row.modalidad,
      educacion: row.educacion,
      experiencia: row.experiencia,
      fecha_expiracion: row.fecha_expiracion,
      fecha_publicacion: row.fecha_publicacion,
      nivel: row.nivel,
      ubicacion: row.ubicacion,
      cupos: row.cupos,
      estado: row.estado,
      aplicar_por: row.aplicar_por,

      // Información de la empresa (si existe)
      empresa: row.empresa_id_perfil ? {
        id_perfil: row.empresa_id_perfil,
        nombre: row.empresa_nombre,
        biografia: row.empresa_biografia,
        link_foto_perfil: row.empresa_link_foto_perfil,
        email: row.empresa_email,
        telefono: row.empresa_telefono,
        ubicacion: row.empresa_ubicacion,
        pagina_web: row.empresa_pagina_web,
        red_social: row.empresa_red_social,
        fecha_nacimiento_fundacion: row.empresa_fecha_nacimiento_fundacion,
      } : undefined,

      // Información de la categoría (si existe)
      categoria: row.categoria_id_categoria ? {
        id_categoria: row.categoria_id_categoria,
        nombre_categoria: row.categoria_nombre_categoria,
        descripcion: row.categoria_descripcion,
      } : undefined,
    }));
  },

  async agregarFavorito(id_perfil: number, id_trabajo: number): Promise<Favorito> {
    // Verificar si ya existe el favorito
    const checkResult = await pool.query(
      `SELECT * FROM favoritos 
       WHERE id_perfil = $1 AND id_trabajo = $2`,
      [id_perfil, id_trabajo]
    );

    if (checkResult.rows.length > 0) {
      throw new CustomError(
        409,
        "Este trabajo ya está en tus favoritos"
      );
    }

    // Insertar el favorito
    const result = await pool.query(
      `INSERT INTO favoritos (id_perfil, id_trabajo)
       VALUES ($1, $2)
       RETURNING *`,
      [id_perfil, id_trabajo]
    );

    return result.rows[0];
  },
};

