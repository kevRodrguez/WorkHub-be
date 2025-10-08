import { UUID } from "crypto";
import { pool } from "../../../config/db";
import { PerfilEmpresa } from "../../../interfaces/perfil.enterprise.interface";
import { CustomError } from "../../../utils/CustomError";
import { NotificacionesRepository } from "../shared/notificaciones.repository";
import { TrabajosRepository } from "./trabajos.repository";

export const AplicacionesEnterpriseRepository = {
  async getAplicacionesByIdTrabajo(id_trabajo: number): Promise<any[]> {
    console.log("ID Trabajo en el repositorio:", id_trabajo); // Verifica que el ID se recibe correctamente
    const query = `
      SELECT 
        p.id_perfil,
        ap.id_aplicacion,
        ap.id_trabajo,
        p.nombre,
        p.id_usuario,
        t.nombre_trabajo,
        p.ubicacion,
        p.experiencia,
        p.educacion,
        p.genero,
        ap.estado,
        p.estado_civil,
        p.fecha_nacimiento_fundacion,
        cv.url_curriculum,
        p.email,
        p.pagina_web,
        p.telefono,
        p.biografia,
        p.red_social
      FROM aplicaciones ap
      JOIN perfiles p ON p.id_perfil = ap.id_candidato
      JOIN trabajos t ON t.id_trabajo = ap.id_trabajo
      JOIN curriculums cv ON cv.id_perfil = p.id_perfil
      WHERE ap.id_trabajo = $1;
    `;
    const result = await pool.query(query, [id_trabajo]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron aplicaciones para este trabajo");
    }
    return result.rows;
  },

  async getAplicacionesByIdEmpresa(id_empresa: number): Promise<any[]> {
    console.log("ID Empresa en el repositorio:", id_empresa); // Verifica que el ID se recibe correctamente
    const query = `
      SELECT 
        p.id_perfil,
        ap.id_aplicacion,
        ap.id_trabajo,
        p.nombre,
        p.id_usuario,
        t.nombre_trabajo,
        TO_CHAR(t.fecha_publicacion, 'DD/MM/YYYY') AS fecha_publicacion,
        p.ubicacion,
        p.experiencia,
        p.educacion,
        p.genero,
        ap.estado,
        p.estado_civil,
        p.fecha_nacimiento_fundacion,
        cv.url_curriculum,
        p.email,
        p.pagina_web,
        p.telefono,
        p.biografia,
        p.red_social
      FROM aplicaciones ap
      JOIN perfiles p ON p.id_perfil = ap.id_candidato
      JOIN trabajos t ON t.id_trabajo = ap.id_trabajo
      JOIN curriculums cv ON cv.id_perfil = p.id_perfil
      WHERE t.id_perfil = $1;
    `;
    const result = await pool.query(query, [id_empresa]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraron aplicaciones para esta empresa");
    }
    return result.rows;
  },

  async updateEstadoAplicacion(id_aplicacion: number, nuevo_estado: string): Promise<any[]> {
    console.log("ID Trabajo en el repositorio:", id_aplicacion); // Verifica que el ID se recibe correctamente
    const query = `
      UPDATE aplicaciones
      SET estado = $1
      WHERE id_aplicacion = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [nuevo_estado, id_aplicacion]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(404, "No se encontraró la aplicacion para este trabajo");
    }


    //plantilla de mensaje
    let mensaje = 'Tu aplicacion a un Trabajo ha sido aceptada/rechazada';


    // Obtener el nombre del trabajo
    const nombreTrabajo = await TrabajosRepository.obtenerNombreTrabajoPorId(result.rows[0].id_trabajo);



    if (result.rows[0].estado === 'aceptado') {
      mensaje = `Felicidades! Tu aplicacion a ${nombreTrabajo ? nombreTrabajo : '<nombre del trabajo>'} ha sido aceptada`;
    }
    else {
      mensaje = `Lo sentimos. Tu aplicacion a ${nombreTrabajo ? nombreTrabajo : '<nombre del trabajo>'} ha sido rechazada`;
    }
    NotificacionesRepository.postNotificacion(result.rows[0].id_candidato, 'aplicacion', mensaje, id_aplicacion);
    return result.rows;
  },

  async createAplicacion(
    id_trabajo: number,
    id_candidato: number,
    id_curriculum: number,
    mensaje: string,
    estado: string = 'pendiente'
  ): Promise<any> {
    const query = `
      INSERT INTO public.aplicaciones (
        id_trabajo, 
        id_candidato, 
        id_curriculum, 
        mensaje, 
        estado
      ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      RETURNING *;
    `;
    const result = await pool.query(query, [
      id_trabajo,
      id_candidato,
      id_curriculum,
      mensaje,
      estado,
    ]);

    if (!result.rows || result.rows.length === 0) {
      throw new CustomError(500, "Error al crear la aplicación");
    }

    return result.rows[0];
  },

};
