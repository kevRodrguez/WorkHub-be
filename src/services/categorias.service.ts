import { CategoriasRepository } from "../data/repositories/candidate/categorias.repository";

export const CategoriasService = {
  async getCategorias() {
    return await CategoriasRepository.getCategorias();
  },

  async getCategoriaById(id: number) {
    return await CategoriasRepository.getCategoriaById(id);
  },

  async insertarCategoria(nombre_categoria: string, descripcion: string) {
    return await CategoriasRepository.insertarCategoria(
      nombre_categoria,
      descripcion
    );
  },

  async actualizarCategoria(
    id_categoria: number,
    nombre_categoria: string,
    descripcion: string
  ) {
    return await CategoriasRepository.actualizarCategoria(
      id_categoria,
      nombre_categoria,
      descripcion
    );
  },

  async eliminarCategoria(id_categoria: number) {
    return await CategoriasRepository.eliminarCategoria(id_categoria);
  },
};
