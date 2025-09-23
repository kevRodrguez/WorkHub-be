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
    // Validar ID
    if (!id || id <= 0) {
      throw new ValidationError("El ID de la categoría debe ser un número positivo");
    }

    const categoria = await CategoriasRepository.getCategoriaById(id);

    if (!categoria) {
      throw new NotFoundError(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  },

  async insertarCategoria(datos: CrearCategoriaDTO): Promise<Categoria> {
    // Validaciones de entrada
    this.validarDatosCategoria(datos);

    // Verificar que no exista una categoría con el mismo nombre
    await this.verificarNombreUnico(datos.nombre_categoria);

    // Sanitizar datos
    const datosSanitizados = {
      nombre_categoria: Validators.sanitizeString(datos.nombre_categoria),
      descripcion: Validators.sanitizeString(datos.descripcion)
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
    // Validar ID
    if (!id_categoria || id_categoria <= 0) {
      throw new ValidationError("El ID de la categoría debe ser un número positivo");
    }

    // Validaciones de entrada
    this.validarDatosCategoria(datos);

    // Verificar que la categoría existe
    await this.getCategoriaById(id_categoria);

    // Verificar que no exista otra categoría con el mismo nombre
    await this.verificarNombreUnico(datos.nombre_categoria, id_categoria);

    // Sanitizar datos
    const datosSanitizados = {
      nombre_categoria: Validators.sanitizeString(datos.nombre_categoria),
      descripcion: Validators.sanitizeString(datos.descripcion)
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
    // Validar ID
    if (!id_categoria || id_categoria <= 0) {
      throw new ValidationError("El ID de la categoría debe ser un número positivo");
    }

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

  // Métodos privados de validación
  validarDatosCategoria(datos: CrearCategoriaDTO | ActualizarCategoriaDTO): void {
    if (!datos.nombre_categoria) {
      throw new ValidationError("El nombre de la categoría es requerido", "nombre_categoria");
    }

    if (!Validators.isValidString(datos.nombre_categoria, 2, 100)) {
      throw new ValidationError("El nombre de la categoría debe tener entre 2 y 100 caracteres", "nombre_categoria");
    }

    if (!datos.descripcion) {
      throw new ValidationError("La descripción es requerida", "descripcion");
    }

    if (!Validators.isValidString(datos.descripcion, 10, 500)) {
      throw new ValidationError("La descripción debe tener entre 10 y 500 caracteres", "descripcion");
    }
  },

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
