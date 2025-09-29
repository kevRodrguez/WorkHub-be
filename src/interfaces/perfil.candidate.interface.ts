export interface Perfil {
  id_perfil: number;
  id_usuario: number;
  nombre: string;
  biografia: string;
  telefono: string;
  link_foto_perfil: string;
  fecha_nacimiento_fundacion: Date;
  genero: string;
  estado_civil: string;
  ubicacion: string;
  pagina_web: string;
  red_social: string;
}

export interface CrearPerfilDTO {
  id_usuario: number;
  nombre: string;
  biografia: string;
  telefono: string;
  link_foto_perfil: string;
  fecha_nacimiento_fundacion: Date;
  genero: string;
  estado_civil: string;
  ubicacion: string;
  pagina_web: string;
  red_social: string;
}

export interface ActualizarPerfilDTO {
  nombre: string;
  biografia: string;
  telefono: string;
  link_foto_perfil: string;
  fecha_nacimiento_fundacion: Date;
  genero: string;
  estado_civil: string;
  ubicacion: string;
  pagina_web: string;
  red_social: string;
}
