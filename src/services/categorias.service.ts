import { CategoriasRepository } from "../data/repositories/categorias.repository";

export const CategoriasService = {
  async getCategorias() {
    return await CategoriasRepository.getCategorias();
  },
};
