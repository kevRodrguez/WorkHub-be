import { TrabajosRepository } from "../../data/repositories/shared/trabajos.repository";
import { Trabajo, TrabajoConDetalles, TrabajoConEmpresa } from "../../interfaces";

export const TrabajosService = {
  async getTrabajos(): Promise<Trabajo[]> {
    const trabajos = await TrabajosRepository.getTrabajos();

    return trabajos;
  },

  async getTrabajosByPerfilId(perfil_id: number): Promise<Trabajo[]> {
    const trabajos = await TrabajosRepository.getTrabajosByPerfilId(perfil_id);

    return trabajos;
  },

  async getTrabajosActivos(): Promise<TrabajoConEmpresa[]> {
    const trabajos = await TrabajosRepository.getTrabajosActivos();

    return trabajos;
  },

  async getTrabajosById(id_trabajo: number): Promise<TrabajoConDetalles[]> {
    const trabajos = await TrabajosRepository.getTrabajosById(id_trabajo);

    return trabajos;
  },
};
