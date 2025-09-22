import { PerfilesRepository } from "../data/repositories/perfiles.repository";

export const PerfilesService = {
  async getPerfiles() {
    return await PerfilesRepository.getPerfiles();
  },

  async getPerfilById(id: number) {
    return await PerfilesRepository.getPerfilById(id);
  },

  async insertarPerfil(
    id_usuario: number,
    nombre: string,
    biografia: string,
    telefono: string,
    link_foto_perfil: string,
    fecha_nacimiento_fundacion: Date,
    genero: string,
    estado_civil: string,
    ubicacion: string,
    pagina_web: string,
    red_social: string
  ) {
    return await PerfilesRepository.insertarPerfil(
      id_usuario,
      nombre,
      biografia,
      telefono,
      link_foto_perfil,
      fecha_nacimiento_fundacion,
      genero,
      estado_civil,
      ubicacion,
      pagina_web,
      red_social
    );
  },

  async actualizarPerfil(
    id_perfil: number,
    nombre: string,
    biografia: string,
    telefono: string,
    link_foto_perfil: string,
    fecha_nacimiento_fundacion: Date,
    genero: string,
    estado_civil: string,
    ubicacion: string,
    pagina_web: string,
    red_social: string
  ) {
    return await PerfilesRepository.actualizarPerfil(
      id_perfil,
      nombre,
      biografia,
      telefono,
      link_foto_perfil,
      fecha_nacimiento_fundacion,
      genero,
      estado_civil,
      ubicacion,
      pagina_web,
      red_social
    );
  },

  async eliminarPerfil(id_perfil: number) {
    return await PerfilesRepository.eliminarPerfil(id_perfil);
  },
};
