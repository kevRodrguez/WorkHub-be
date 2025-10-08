import { RespuestaRepository } from "../../data/repositories/forum/answerForum.repository";
import {
  ActualizarRespuestaDTO,
  CrearRespuestaDTO,
  Respuesta,
} from "../../interfaces/anwserForum.interface";
import { NotFoundError } from "../../utils/errors";

export const RespuestaService = {
  async getRespuestas(): Promise<Respuesta[]> {
    const respuestas = await RespuestaRepository.getRespuestas();
    return respuestas.map((respuesta) => ({
      ...respuesta,
      id_foro: respuesta.id_foro,
      id_perfil: respuesta.id_perfil,
      contenido: respuesta.contenido,
      fecha: respuesta.fecha,
    }));
  },

  async getRespuestasByForoId(foro_id: number): Promise<Respuesta[]> {
    const respuestas = await RespuestaRepository.getRespuestasByForoId(foro_id);
    return respuestas.map((respuesta) => ({
      ...respuesta,
      id_foro: respuesta.id_foro,
      id_perfil: respuesta.id_perfil,
      contenido: respuesta.contenido,
      fecha: respuesta.fecha,
    }));
  },

  async getRespuestasByUserId(user_id: number): Promise<Respuesta[]> {
    const respuestas = await RespuestaRepository.getRespuestasByUserId(user_id);
    return respuestas.map((respuesta) => ({
      ...respuesta,
      id_foro: respuesta.id_foro,
      id_perfil: respuesta.id_perfil,
      contenido: respuesta.contenido,
      fecha: respuesta.fecha,
    }));
  },

  async getRespuestaById(id: number): Promise<Respuesta> {
    const respuesta = await RespuestaRepository.getRespuestaById(id);

    if (!respuesta) {
      throw new NotFoundError(`Respuesta con ID ${id} no encontrada`);
    }
    return respuesta;
  },

  async crearRespuesta(datos: CrearRespuestaDTO): Promise<Respuesta | null> {
    return await RespuestaRepository.crearRespuesta(
      datos.id_foro,
      datos.id_perfil,
      datos.contenido,
      new Date()
    );
  },


  async actualizarRespuesta(
    id_respuesta_foro: number,
    datos: string,
  ): Promise<Respuesta | null> {
    await this.getRespuestaById(id_respuesta_foro);

    return await RespuestaRepository.actualizarRespuesta(
      id_respuesta_foro,
      datos,
      new Date()
    );
  },

  async eliminarRespuesta(
    id_respuesta_foro: number
  ): Promise<Respuesta | null> {
    await this.getRespuestaById(id_respuesta_foro);
    return await RespuestaRepository.eliminarRespuesta(id_respuesta_foro);
  },
};
