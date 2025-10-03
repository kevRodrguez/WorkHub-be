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




//* Interfaces para la vista general

// Trabajos aplicados
export interface TrabajosAplicadosInterface {
  success: boolean;
  data:    DataTrabajosAplicados[];
  message: string;
}

export interface DataTrabajosAplicados {
  id_aplicacion:     number;
  id_usuario:        string;
  id_candidato:      number;
  id_trabajo:        number;
  link_foto_perfil:  string;
  nombre_trabajo:    string;
  modalidad:         string;
  ubicacion:         string;
  salario_minimo:    number;
  salario_maximo:    number;
  fecha_expiracion:  Date;
  estado_aplicacion: string;
  id_perfil_empresa: number;
  nombre_empresa:    string;
  logo_empresa:      string;
  estado_trabajo:    boolean;
  mensaje:           string;
  id_curriculum:     number;
}

