export interface Perfil {
  id_perfil: number;
  id_usuario: number;
  nombre: string;
  genero: string;
  estado_civil: string;
  experiencia: string;
  educacion: string;
  biografia: string;
  fecha_nacimiento_fundacion: Date;
  telefono: string;
  ubicacion: string;
  email: string;
  pagina_web: string;
  red_social: string;
  rol: string;
  link_foto_perfil: string;
}

export interface CrearPerfilDTO {
  id_usuario: number;
  nombre: string;
  genero: string;
  estado_civil: string;
  experiencia: string;
  educacion: string;
  biografia: string;
  fecha_nacimiento_fundacion: Date;
  telefono: string;
  email: string;
  ubicacion: string;
  pagina_web: string;
  red_social: string;
  rol: string;
  link_foto_perfil: string;
}

export interface ActualizarPerfilDTO {
  nombre: string;
  genero: string;
  estado_civil: string;
  experiencia: string;
  educacion: string;
  biografia: string;
  fecha_nacimiento_fundacion: Date;
  telefono: string;
  ubicacion: string;
  email: string;
  pagina_web: string;
  red_social: string;
  rol: string;
  link_foto_perfil: string;
}
