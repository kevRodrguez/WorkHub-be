/*
Tabla trabajos en la database
id_trabajo (PK)
id_perfil (FK) (empresa)
id_categoria (FK)
nombre_trabajo
descripcion
responsabilidades
salario_minimo
salario_maximo
modalidad (presencial, remoto, híbrido)
educacion
experiencia
fecha_expiracion
ubicacion
*/

import { pool } from "../../../config/db";
import { CustomError } from "../../../utils/CustomError";
import {
  ActualizarTrabajoDTO,
  CrearTrabajoDTO,
  Trabajo,
} from "../../../interfaces";

export const TrabajosRepository = {
  async insertarTrabajo(trabajo: CrearTrabajoDTO): Promise<CrearTrabajoDTO> {
    const result = await pool.query(
      "INSERT INTO trabajos (id_perfil, id_categoria, nombre_trabajo, descripcion, responsabilidades, salario_minimo, salario_maximo, modalidad, educacion, experiencia, fecha_expiracion, nivel, ubicacion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        trabajo.id_perfil,
        trabajo.id_categoria,
        trabajo.nombre_trabajo,
        trabajo.descripcion,
        trabajo.responsabilidades,
        trabajo.salario_minimo,
        trabajo.salario_maximo,
        trabajo.modalidad,
        trabajo.educacion,
        trabajo.experiencia,
        trabajo.fecha_expiracion,
        trabajo.nivel,
        trabajo.ubicacion,
      ]
    );

    if (result.rows.length === 0) {
      throw new CustomError(500, "Error al crear el trabajo");
    }

    return result.rows[0];
  },

  async actualizarTrabajo(
    id_trabajo: number,
    trabajo: ActualizarTrabajoDTO
  ): Promise<ActualizarTrabajoDTO> {
    const result = await pool.query(
      "UPDATE trabajos SET id_categoria = $1, nombre_trabajo = $2, descripcion = $3, responsabilidades = $4, salario_minimo = $5, salario_maximo = $6, modalidad = $7, educacion = $8, experiencia = $9, fecha_expiracion = $10, nivel = $11, ubicacion = $12 WHERE id_trabajo = $13 RETURNING *",
      [
        trabajo.id_categoria,
        trabajo.nombre_trabajo,
        trabajo.descripcion,
        trabajo.responsabilidades,
        trabajo.salario_minimo,
        trabajo.salario_maximo,
        trabajo.modalidad,
        trabajo.educacion,
        trabajo.experiencia,
        trabajo.fecha_expiracion,
        trabajo.nivel,
        trabajo.ubicacion,
        id_trabajo,
      ]
    );

    if (result.rows.length === 0) {
      throw new CustomError(404, "Trabajo no encontrado");
    }

    return result.rows[0] || null;
  },

  async eliminarTrabajo(id_trabajo: number): Promise<Trabajo | null> {
    const result = await pool.query(
      "DELETE FROM trabajos WHERE id_trabajo = $1 RETURNING *",
      [id_trabajo]
    );

    if (result.rows.length === 0) {
      throw new CustomError(404, "Trabajo no encontrado");
    }

    return result.rows[0] || null;
  },
};
