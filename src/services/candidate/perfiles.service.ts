import { UUID } from "crypto";
import { PerfilesRepository } from "../../data/repositories/candidate/perfiles.repository";
import { ActualizarPerfilDTO, CrearPerfilDTO, Perfil } from "../../interfaces";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";
import { Validators } from "../../utils/validators";
import { CustomError } from "../../utils/CustomError";

export const PerfilesCandidateService = {
  async getPerfiles(): Promise<Perfil[]> {
    const perfiles = await PerfilesRepository.getPerfiles();

    // Aplicar transformaciones si es necesario
    return perfiles.map((perfil) => ({
      ...perfil,
      nombre: perfil.nombre.trim(),
      biografia: perfil.biografia.trim(),
      telefono: perfil.telefono.trim(),
      ubicacion: perfil.ubicacion.trim(),
    }));
  },

  async getPerfilById(id: UUID): Promise<Perfil> {
    // express-validator ya validó que id sea positivo
    const perfil = await PerfilesRepository.getPerfilById(id);

    if (!perfil) {
      throw new NotFoundError(`Perfil con ID ${id} no encontrado`);
    }

    return perfil;
  },

  async insertarPerfil(datos: CrearPerfilDTO): Promise<Perfil> {
    // Las validaciones básicas las maneja express-validator
    // Solo validaciones de negocio específicas aquí
    await this.validarUsuarioUnico(datos.id_usuario);

    // Validar que sea mayor de edad (validación de negocio específica)
    if (
      datos.fecha_nacimiento_fundacion &&
      !Validators.isAdult(datos.fecha_nacimiento_fundacion)
    ) {
      throw new BusinessRuleError(
        "El candidato debe ser mayor de edad (18 años)"
      );
    }

    // Sanitizar datos (express-validator ya sanitiza los básicos)
    const datosSanitizados = this.sanitizarDatosPerfil(datos);

    return await PerfilesRepository.insertarPerfil(
      datosSanitizados.id_usuario,
      datosSanitizados.nombre,
      datosSanitizados.genero,
      datosSanitizados.estado_civil,
      datosSanitizados.experiencia,
      datosSanitizados.educacion,
      datosSanitizados.biografia,
      datosSanitizados.fecha_nacimiento_fundacion,
      datosSanitizados.telefono,
      datosSanitizados.ubicacion,
      datosSanitizados.email,
      datosSanitizados.pagina_web,
      datosSanitizados.red_social,
      datosSanitizados.rol,
      datosSanitizados.link_foto_perfil,

    );
  },

  async actualizarPerfil(
    id_usuario: UUID,
    datos: ActualizarPerfilDTO
  ): Promise<Perfil> {
    // express-validator ya validó que id_usuario sea válido y los datos básicos

    // Verificar que el perfil existe
    await this.getPerfilById(id_usuario);

    // Validar mayor de edad si se proporciona fecha de nacimiento
    if (
      datos.fecha_nacimiento_fundacion &&
      !Validators.isAdult(datos.fecha_nacimiento_fundacion)
    ) {
      throw new BusinessRuleError(
        "El candidato debe ser mayor de edad (18 años)"
      );
    }

    // Sanitizar datos
    const datosSanitizados = this.sanitizarDatosActualizacionPerfil(datos);

    const perfilActualizado = await PerfilesRepository.actualizarPerfil(
      id_usuario,
      datosSanitizados.nombre,
      datosSanitizados.genero,
      datosSanitizados.estado_civil,
      datosSanitizados.experiencia,
      datosSanitizados.educacion,
      datosSanitizados.biografia,
      datosSanitizados.fecha_nacimiento_fundacion,
      datosSanitizados.telefono,
      datosSanitizados.ubicacion,
      datosSanitizados.email,
      datosSanitizados.pagina_web,
      datosSanitizados.red_social,
      datosSanitizados.rol,
      datosSanitizados.link_foto_perfil,
    );

    if (!perfilActualizado) {
      throw new NotFoundError(
        `No se pudo actualizar el perfil con ID ${id_usuario}`
      );
    }

    return perfilActualizado;
  },

  async eliminarPerfil(id_usuario: UUID): Promise<Perfil> {
    // express-validator ya validó que id_usuario sea válido

    // Verificar que el perfil existe
    await this.getPerfilById(id_usuario);

    const perfilEliminado = await PerfilesRepository.eliminarPerfil(id_usuario);

    if (!perfilEliminado) {
      throw new NotFoundError(
        `No se pudo eliminar el perfil con ID ${id_usuario}`
      );
    }

    return perfilEliminado;
  },

  // Validaciones de negocio (no cubiertas por express-validator)
  async validarUsuarioUnico(id_usuario: number): Promise<void> {
    const perfiles = await PerfilesRepository.getPerfiles();

    const usuarioExiste = perfiles.some(
      (perfil) => perfil.id_usuario === id_usuario
    );

    if (usuarioExiste) {
      throw new BusinessRuleError(
        `Ya existe un perfil para el usuario con ID ${id_usuario}`
      );
    }
  },

  async getTrabajosAplicados(id_usuario: UUID) {

    await this.getPerfilById(id_usuario); // Verificar que el perfil existe

    const trabajos = await PerfilesRepository.getTrabajosAplicados(id_usuario);

    if (!trabajos || trabajos.length === 0) {
      throw new NotFoundError("No se encontraron trabajos aplicados");
    }

    return trabajos;
  },

  async getTopTrabajosAplicados(id_usuario: UUID) {

    await this.getPerfilById(id_usuario); // Verificar que el perfil existe

    const trabajos = await PerfilesRepository.getTopTrabajosAplicados(id_usuario);

    if (!trabajos || trabajos.length === 0) {
      throw new NotFoundError("No se encontraron trabajos aplicados");
    }

    return trabajos;
  },

  async getTrabajosFavoritos(id_usuario: UUID) {
    await this.getPerfilById(id_usuario); // Verificar que el perfil existe

    const trabajos = await PerfilesRepository.getTrabajosFavoritos(id_usuario);
    if (!trabajos || trabajos.length === 0) {
      throw new NotFoundError("No se encontraron trabajos favoritos");
    }

    return trabajos;
  },

  async getProfileStats(id_usuario: UUID) {
    await this.getPerfilById(id_usuario); // Verificar que el perfil existe

    const stats = await PerfilesRepository.getProfileStats(id_usuario);

    if (!stats) {
      throw new NotFoundError("No se encontraron estadísticas del perfil");
    }

    return stats;
  },

  async getAlertasTrabajos(id_usuario: UUID) {
    await this.getPerfilById(id_usuario); // Verificar que el perfil existe

    const alertas = await PerfilesRepository.getAlertasTrabajo(id_usuario);

    if (!alertas || alertas.length === 0) {
      throw new NotFoundError("No se encontraron alertas de trabajo");
    }

    return alertas;
  },

  async actualizarEstadoNotificacion(id_notificacion: number, leido: boolean) {
    // Actualizar el estado de la notificación específica
    const notificacionActualizada = await PerfilesRepository.actualizarEstadoNotificacion(
      id_notificacion,
      leido
    );

    if (!notificacionActualizada) {
      throw new NotFoundError(`Notificación con ID ${id_notificacion} no encontrada`);
    }

    return notificacionActualizada;
  },

  async eliminarFavorito(id_favorito: number): Promise<any> {
    // Validar que el id_favorito sea un número positivo
    if (!id_favorito || id_favorito <= 0) {
      throw new CustomError(400, "El ID del favorito debe ser un número positivo");
    }

    const favoritoEliminado = await PerfilesRepository.eliminarFavorito(id_favorito);

    if (!favoritoEliminado) {
      throw new NotFoundError(`Favorito con ID ${id_favorito} no encontrado`);
    }

    return favoritoEliminado;
  },

  // Sanitización adicional (express-validator ya maneja lo básico)
  sanitizarDatosPerfil(datos: CrearPerfilDTO): CrearPerfilDTO {
    return {
      ...datos,
      nombre: datos.nombre?.trim() || "",
      genero: datos.genero?.toLowerCase() || "",
      estado_civil: datos.estado_civil?.toLowerCase() || "",
      experiencia: datos.experiencia?.toLowerCase() || "",
      educacion: datos.educacion?.toLowerCase() || "",
      biografia: datos.biografia?.toLowerCase() || "",
      telefono: datos.telefono?.trim() || "",
      email: datos.email?.toLowerCase() || "",
      pagina_web: datos.pagina_web || "",
      red_social: datos.red_social || "",
      ubicacion: datos.ubicacion?.toLowerCase() || "",
      rol: datos.rol?.toLowerCase() || "",
      link_foto_perfil: datos.link_foto_perfil || "",

    };
  },

  sanitizarDatosActualizacionPerfil(
    datos: ActualizarPerfilDTO
  ): ActualizarPerfilDTO {
    return {
      ...datos,
      nombre: datos.nombre?.trim() || "",
      genero: datos.genero?.toLowerCase() || "",
      estado_civil: datos.estado_civil?.toLowerCase() || "",
      experiencia: datos.experiencia?.toLowerCase() || "",
      educacion: datos.educacion?.toLowerCase() || "",
      biografia: datos.biografia?.toLowerCase() || "",
      telefono: datos.telefono?.trim() || "",
      ubicacion: datos.ubicacion?.toLowerCase() || "",
      email: datos.email?.toLowerCase() || "",
      pagina_web: datos.pagina_web || "",
      red_social: datos.red_social || "",
      rol: datos.rol?.toLowerCase() || "",
      link_foto_perfil: datos.link_foto_perfil || "",
    };
  },
};
