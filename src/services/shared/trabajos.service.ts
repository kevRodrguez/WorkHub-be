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
};
