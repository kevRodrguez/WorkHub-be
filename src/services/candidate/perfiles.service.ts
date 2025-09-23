import { PerfilesRepository } from "../../data/repositories/candidate/perfiles.repository";
import { CrearPerfilDTO, ActualizarPerfilDTO, Perfil } from "../../interfaces/perfil.interface";
import { ValidationError, NotFoundError, BusinessRuleError } from "../../utils/errors";
import { Validators } from "../../utils/validators";

export const PerfilesService = {
  async getPerfiles(): Promise<Perfil[]> {
    const perfiles = await PerfilesRepository.getPerfiles();

    // Aplicar transformaciones si es necesario
    return perfiles.map(perfil => ({
      ...perfil,
      nombre: perfil.nombre.trim(),
      biografia: perfil.biografia.trim(),
      telefono: perfil.telefono.trim(),
      ubicacion: perfil.ubicacion.trim()
    }));
  },

  async getPerfilById(id: number): Promise<Perfil> {
    // Validar ID
    if (!id || id <= 0) {
      throw new ValidationError("El ID del perfil debe ser un número positivo");
    }

    const perfil = await PerfilesRepository.getPerfilById(id);

    if (!perfil) {
      throw new NotFoundError(`Perfil con ID ${id} no encontrado`);
    }

    return perfil;
  },

  async insertarPerfil(datos: CrearPerfilDTO): Promise<Perfil> {
    // Validaciones de entrada
    this.validarDatosPerfil(datos);

    // Validaciones de negocio específicas para creación
    await this.validarUsuarioUnico(datos.id_usuario);

    // Sanitizar datos
    const datosSanitizados = this.sanitizarDatosPerfil(datos);

    return await PerfilesRepository.insertarPerfil(
      datosSanitizados.id_usuario,
      datosSanitizados.nombre,
      datosSanitizados.biografia,
      datosSanitizados.telefono,
      datosSanitizados.link_foto_perfil,
      datosSanitizados.fecha_nacimiento_fundacion,
      datosSanitizados.genero,
      datosSanitizados.estado_civil,
      datosSanitizados.ubicacion,
      datosSanitizados.pagina_web,
      datosSanitizados.red_social
    );
  },

  async actualizarPerfil(
    id_perfil: number,
    datos: ActualizarPerfilDTO
  ): Promise<Perfil> {
    // Validar ID
    if (!id_perfil || id_perfil <= 0) {
      throw new ValidationError("El ID del perfil debe ser un número positivo");
    }

    // Validaciones de entrada
    this.validarDatosActualizacionPerfil(datos);

    // Verificar que el perfil existe
    await this.getPerfilById(id_perfil);

    // Sanitizar datos
    const datosSanitizados = this.sanitizarDatosActualizacionPerfil(datos);

    const perfilActualizado = await PerfilesRepository.actualizarPerfil(
      id_perfil,
      datosSanitizados.nombre,
      datosSanitizados.biografia,
      datosSanitizados.telefono,
      datosSanitizados.link_foto_perfil,
      datosSanitizados.fecha_nacimiento_fundacion,
      datosSanitizados.genero,
      datosSanitizados.estado_civil,
      datosSanitizados.ubicacion,
      datosSanitizados.pagina_web,
      datosSanitizados.red_social
    );

    if (!perfilActualizado) {
      throw new NotFoundError(`No se pudo actualizar el perfil con ID ${id_perfil}`);
    }

    return perfilActualizado;
  },

  async eliminarPerfil(id_perfil: number): Promise<Perfil> {
    // Validar ID
    if (!id_perfil || id_perfil <= 0) {
      throw new ValidationError("El ID del perfil debe ser un número positivo");
    }

    // Verificar que el perfil existe
    await this.getPerfilById(id_perfil);

    const perfilEliminado = await PerfilesRepository.eliminarPerfil(id_perfil);

    if (!perfilEliminado) {
      throw new NotFoundError(`No se pudo eliminar el perfil con ID ${id_perfil}`);
    }

    return perfilEliminado;
  },

  // Métodos de validación
  validarDatosPerfil(datos: CrearPerfilDTO): void {
    // Validar ID de usuario
    if (!datos.id_usuario || datos.id_usuario <= 0) {
      throw new ValidationError("El ID de usuario debe ser un número positivo", "id_usuario");
    }

    // Validar nombre
    if (!datos.nombre) {
      throw new ValidationError("El nombre es requerido", "nombre");
    }
    if (!Validators.isValidString(datos.nombre, 2, 100)) {
      throw new ValidationError("El nombre debe tener entre 2 y 100 caracteres", "nombre");
    }

    // Validar biografía
    if (!datos.biografia) {
      throw new ValidationError("La biografía es requerida", "biografia");
    }
    if (!Validators.isValidString(datos.biografia, 10, 1000)) {
      throw new ValidationError("La biografía debe tener entre 10 y 1000 caracteres", "biografia");
    }

    // Validar teléfono
    if (!datos.telefono) {
      throw new ValidationError("El teléfono es requerido", "telefono");
    }
    if (!Validators.isValidPhone(datos.telefono)) {
      throw new ValidationError("El formato del teléfono no es válido", "telefono");
    }

    // Validar fecha de nacimiento
    if (!datos.fecha_nacimiento_fundacion) {
      throw new ValidationError("La fecha de nacimiento es requerida", "fecha_nacimiento_fundacion");
    }
    if (!Validators.isValidDate(datos.fecha_nacimiento_fundacion)) {
      throw new ValidationError("La fecha de nacimiento no es válida", "fecha_nacimiento_fundacion");
    }

    // Validar que sea mayor de edad (para candidatos)
    if (!Validators.isAdult(datos.fecha_nacimiento_fundacion)) {
      throw new BusinessRuleError("El candidato debe ser mayor de edad (18 años)");
    }

    // Validar género
    const generosValidos = ['masculino', 'femenino', 'otro', 'prefiero no decir'];
    if (!datos.genero || !generosValidos.includes(datos.genero.toLowerCase())) {
      throw new ValidationError("El género debe ser uno de: " + generosValidos.join(', '), "genero");
    }

    // Validar estado civil
    const estadosCiviles = ['soltero', 'casado', 'divorciado', 'viudo', 'unión libre'];
    if (!datos.estado_civil || !estadosCiviles.includes(datos.estado_civil.toLowerCase())) {
      throw new ValidationError("El estado civil debe ser uno de: " + estadosCiviles.join(', '), "estado_civil");
    }

    // Validar ubicación
    if (!datos.ubicacion) {
      throw new ValidationError("La ubicación es requerida", "ubicacion");
    }
    if (!Validators.isValidString(datos.ubicacion, 2, 100)) {
      throw new ValidationError("La ubicación debe tener entre 2 y 100 caracteres", "ubicacion");
    }

    // Validar URL de página web (opcional)
    if (datos.pagina_web && !Validators.isValidURL(datos.pagina_web)) {
      throw new ValidationError("La URL de la página web no es válida", "pagina_web");
    }

    // Validar URL de foto de perfil (opcional)
    if (datos.link_foto_perfil && !Validators.isValidURL(datos.link_foto_perfil)) {
      throw new ValidationError("La URL de la foto de perfil no es válida", "link_foto_perfil");
    }
  },

  validarDatosActualizacionPerfil(datos: ActualizarPerfilDTO): void {
    // Reutilizar validaciones base pero sin validar id_usuario
    const datosConUsuarioTemp = { ...datos, id_usuario: 1 };
    this.validarDatosPerfil(datosConUsuarioTemp as CrearPerfilDTO);
  },

  async validarUsuarioUnico(id_usuario: number): Promise<void> {
    const perfiles = await PerfilesRepository.getPerfiles();

    const usuarioExiste = perfiles.some(perfil => perfil.id_usuario === id_usuario);

    if (usuarioExiste) {
      throw new BusinessRuleError(`Ya existe un perfil para el usuario con ID ${id_usuario}`);
    }
  },

  sanitizarDatosPerfil(datos: CrearPerfilDTO): CrearPerfilDTO {
    return {
      ...datos,
      nombre: Validators.sanitizeString(datos.nombre),
      biografia: Validators.sanitizeString(datos.biografia),
      telefono: Validators.sanitizeString(datos.telefono),
      ubicacion: Validators.sanitizeString(datos.ubicacion),
      genero: datos.genero.toLowerCase(),
      estado_civil: datos.estado_civil.toLowerCase(),
      pagina_web: datos.pagina_web || '',
      red_social: datos.red_social || '',
      link_foto_perfil: datos.link_foto_perfil || ''
    };
  },

  sanitizarDatosActualizacionPerfil(datos: ActualizarPerfilDTO): ActualizarPerfilDTO {
    return {
      ...datos,
      nombre: Validators.sanitizeString(datos.nombre),
      biografia: Validators.sanitizeString(datos.biografia),
      telefono: Validators.sanitizeString(datos.telefono),
      ubicacion: Validators.sanitizeString(datos.ubicacion),
      genero: datos.genero.toLowerCase(),
      estado_civil: datos.estado_civil.toLowerCase(),
      pagina_web: datos.pagina_web || '',
      red_social: datos.red_social || '',
      link_foto_perfil: datos.link_foto_perfil || ''
    };
  }
};
