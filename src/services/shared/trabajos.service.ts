import { TrabajosRepository } from "../../data/repositories/shared/trabajos.repository";
import { Trabajo, TrabajoConDetalles, TrabajoConEmpresa, Favorito, AgregarFavoritoDTO } from "../../interfaces";
import { CustomError } from "../../utils/CustomError";

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

  async agregarFavorito(datos: AgregarFavoritoDTO): Promise<Favorito> {
    // Validaciones
    if (!datos.id_perfil || datos.id_perfil <= 0) {
      throw new CustomError(400, "El ID del perfil es requerido y debe ser válido");
    }

    if (!datos.id_trabajo || datos.id_trabajo <= 0) {
      throw new CustomError(400, "El ID del trabajo es requerido y debe ser válido");
    }

    const favorito = await TrabajosRepository.agregarFavorito(datos.id_perfil, datos.id_trabajo);

    return favorito;
  },
};
