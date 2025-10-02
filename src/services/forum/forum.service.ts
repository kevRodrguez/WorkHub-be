import { ForosRepository } from "../../data/repositories/forum/forum.repository";
import {
  CrearForoDTO,
  ActtualizarForoDTO,
  Foro,
} from "../../interfaces/forum.interface";
import { NotFoundError } from "../../utils/errors";

export const ForoService = {
  async getForos(): Promise<Foro[]> {
    const foros = await ForosRepository.getForos();
    return foros.map((foro) => ({
      ...foro,
      id_categoria: foro.id_categoria,
      id_perfil: foro.id_perfil,
      titulo: foro.titulo,
      contenido: foro.contenido,
      fecha: foro.fecha,
    }));
  },

  async getForoById(id: number): Promise<Foro> {
    const foro = await ForosRepository.getForoById(id);

    if (!foro) {
      throw new NotFoundError(`Foro con ID ${id} no encontrado`);
    }

    return foro;
  },

  async crearForo(datos: CrearForoDTO): Promise<Foro | null> {
    return await ForosRepository.crearForo(
      datos.id_categoria,
      datos.id_perfil,
      datos.titulo,
      datos.contenido,
      new Date()
    );
  },

  async actualizarForo(
    id_categoria: number,
    datos: ActtualizarForoDTO
  ): Promise<Foro | null> {
    // Verificar que el foro existe
    await this.getForoById(id_categoria);

    return await ForosRepository.actualizarForo(
      id_categoria,
      datos.id_categoria,
      datos.id_perfil,
      datos.titulo,
      datos.contenido,
      new Date()
    );
  },

  async eliminarForo(id_foro: number): Promise<Foro | null> {
    await this.getForoById(id_foro);
    return await ForosRepository.eliminarForo(id_foro);
  },
};
