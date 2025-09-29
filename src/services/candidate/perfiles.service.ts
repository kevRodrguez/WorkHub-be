import { PerfilesRepository } from "../../data/repositories/candidate/perfiles.repository";
import { ActualizarPerfilDTO, CrearPerfilDTO, Perfil } from "../../interfaces";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";
import { Validators } from "../../utils/validators";

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

  async getPerfilById(id: number): Promise<Perfil> {
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
    // express-validator ya validó que id_perfil sea positivo y los datos básicos

    // Verificar que el perfil existe
    await this.getPerfilById(id_perfil);

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
      throw new NotFoundError(
        `No se pudo actualizar el perfil con ID ${id_perfil}`
      );
    }

    return perfilActualizado;
  },

  async eliminarPerfil(id_perfil: number): Promise<Perfil> {
    // express-validator ya validó que id_perfil sea positivo

    // Verificar que el perfil existe
    await this.getPerfilById(id_perfil);

    const perfilEliminado = await PerfilesRepository.eliminarPerfil(id_perfil);

    if (!perfilEliminado) {
      throw new NotFoundError(
        `No se pudo eliminar el perfil con ID ${id_perfil}`
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

  // Sanitización adicional (express-validator ya maneja lo básico)
  sanitizarDatosPerfil(datos: CrearPerfilDTO): CrearPerfilDTO {
    return {
      ...datos,
      nombre: datos.nombre?.trim() || "",
      biografia: datos.biografia?.trim() || "",
      telefono: datos.telefono?.trim() || "",
      ubicacion: datos.ubicacion?.trim() || "",
      genero: datos.genero?.toLowerCase() || "",
      estado_civil: datos.estado_civil?.toLowerCase() || "",
      pagina_web: datos.pagina_web || "",
      red_social: datos.red_social || "",
      link_foto_perfil: datos.link_foto_perfil || "",
    };
  },

  sanitizarDatosActualizacionPerfil(
    datos: ActualizarPerfilDTO
  ): ActualizarPerfilDTO {
    return {
      ...datos,
      nombre: datos.nombre?.trim() || "",
      biografia: datos.biografia?.trim() || "",
      telefono: datos.telefono?.trim() || "",
      ubicacion: datos.ubicacion?.trim() || "",
      genero: datos.genero?.toLowerCase() || "",
      estado_civil: datos.estado_civil?.toLowerCase() || "",
      pagina_web: datos.pagina_web || "",
      red_social: datos.red_social || "",
      link_foto_perfil: datos.link_foto_perfil || "",
    };
  },
};
