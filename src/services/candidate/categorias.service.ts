import { CategoriasRepository } from "../../data/repositories/candidate/categorias.repository";
import { CrearCategoriaDTO, ActualizarCategoriaDTO, Categoria } from "../../interfaces/categoria.interface";
import { ValidationError, NotFoundError, BusinessRuleError } from "../../utils/errors";
import { Validators } from "../../utils/validators";

export const CategoriasService = {
  async getCategorias(): Promise<Categoria[]> {
    const categorias = await CategoriasRepository.getCategorias();

    // Aplicar transformaciones si es necesario
    return categorias.map(categoria => ({
      ...categoria,
      nombre_categoria: categoria.nombre_categoria.trim(),
      descripcion: categoria.descripcion.trim()
    }));
  },

  async getCategoriaById(id: number): Promise<Categoria> {
    // express-validator ya validó que id sea positivo
    const categoria = await CategoriasRepository.getCategoriaById(id);

    if (!categoria) {
      throw new NotFoundError(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  },

  async insertarCategoria(datos: CrearCategoriaDTO): Promise<Categoria> {
    // Las validaciones básicas las maneja express-validator
    // Solo validaciones de negocio específicas aquí
    await this.verificarNombreUnico(datos.nombre_categoria);

    // Sanitizar datos (express-validator ya sanitiza los básicos)
    const datosSanitizados = {
      nombre_categoria: datos.nombre_categoria.trim(),
      descripcion: datos.descripcion.trim()
    };

    return await CategoriasRepository.insertarCategoria(
      datosSanitizados.nombre_categoria,
      datosSanitizados.descripcion
    );
  },

  async actualizarCategoria(
    id_categoria: number,
    datos: ActualizarCategoriaDTO
  ): Promise<Categoria> {
    // express-validator ya validó que id_categoria sea positivo y los datos básicos

    // Verificar que la categoría existe
    await this.getCategoriaById(id_categoria);

    // Verificar que no exista otra categoría con el mismo nombre
    await this.verificarNombreUnico(datos.nombre_categoria, id_categoria);

    // Sanitizar datos
    const datosSanitizados = {
      nombre_categoria: datos.nombre_categoria.trim(),
      descripcion: datos.descripcion.trim()
    };

    const categoriaActualizada = await CategoriasRepository.actualizarCategoria(
      id_categoria,
      datosSanitizados.nombre_categoria,
      datosSanitizados.descripcion
    );

    if (!categoriaActualizada) {
      throw new NotFoundError(`No se pudo actualizar la categoría con ID ${id_categoria}`);
    }

    return categoriaActualizada;
  },

  async eliminarCategoria(id_categoria: number): Promise<Categoria> {
    // express-validator ya validó que id_categoria sea positivo

    // Verificar que la categoría existe
    await this.getCategoriaById(id_categoria);

    // TODO: Verificar que no haya perfiles asociados a esta categoría
    // const perfilesAsociados = await PerfilesRepository.getByCategoria(id_categoria);
    // if (perfilesAsociados.length > 0) {
    //   throw new BusinessRuleError("No se puede eliminar una categoría que tiene perfiles asociados");
    // }

    const categoriaEliminada = await CategoriasRepository.eliminarCategoria(id_categoria);

    if (!categoriaEliminada) {
      throw new NotFoundError(`No se pudo eliminar la categoría con ID ${id_categoria}`);
    }

    return categoriaEliminada;
  },

  // Validaciones de negocio (no cubiertas por express-validator)
  async verificarNombreUnico(nombre: string, idExcluir?: number): Promise<void> {
    const categorias = await CategoriasRepository.getCategorias();

    const nombreExiste = categorias.some(categoria =>
      categoria.nombre_categoria.toLowerCase() === nombre.toLowerCase() &&
      categoria.id_categoria !== idExcluir
    );

    if (nombreExiste) {
      throw new BusinessRuleError(`Ya existe una categoría con el nombre "${nombre}"`);
    }
  }
};
