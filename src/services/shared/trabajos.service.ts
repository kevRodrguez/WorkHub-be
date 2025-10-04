import { TrabajosRepository } from "../../data/repositories/shared/trabajos.repository";

export const TrabajosService = {
  async getTrabajos() {
    const trabajos = await TrabajosRepository.getTrabajos();

    return trabajos;
  },

  async getTrabajosByPerfilId(perfil_id: number) {
    const trabajos = await TrabajosRepository.getTrabajosByPerfilId(perfil_id);

    return trabajos;
  },

  async getTrabajosActivos() {
    const trabajos = await TrabajosRepository.getTrabajosActivos();

    return trabajos;
  },
  async getTrabajosById(id_trabajo: number) {
    const trabajos = await TrabajosRepository.getTrabajosById(id_trabajo);

    return trabajos;
  },
};
