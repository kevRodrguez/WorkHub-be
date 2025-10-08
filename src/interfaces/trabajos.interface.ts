export interface Trabajo {
  id_trabajo: number;
  id_perfil: number;
  id_categoria: number;
  nombre_trabajo: string;
  descripcion: string;
  responsabilidades: string[];
  salario_minimo: number;
  salario_maximo: number;
  modalidad: "presencial" | "remoto" | "híbrido";
  educacion: string;
  experiencia: string;
  fecha_expiracion: Date;
  fecha_publicacion?: Date;
  nivel: string;
  ubicacion: string;
  cupos?: number;
  estado?: boolean;
  aplicar_por?: string;
}

export interface TrabajoConDetalles extends Trabajo {
  // Información de la empresa
  empresa?: {
    id_perfil: number;
    nombre: string;
    biografia?: string;
    link_foto_perfil?: string;
    email?: string;
    telefono?: string;
    ubicacion?: string;
    pagina_web?: string;
    red_social?: string;
    fecha_nacimiento_fundacion?: Date;
  };

  // Información de la categoría
  categoria?: {
    id_categoria: number;
    nombre_categoria: string;
    descripcion?: string;
  };
}

export interface TrabajoConEmpresa extends Trabajo {
  // Información básica de la empresa
  nombre_empresa?: string;
  logo_empresa?: string;
}export interface CrearTrabajoDTO {
  id_perfil: number;
  id_categoria: number;
  nombre_trabajo: string;
  descripcion: string;
  responsabilidades: string[];
  salario_minimo: number;
  salario_maximo: number;
  modalidad: "Presencial" | "Remoto" | "Híbrido";
  educacion: string;
  experiencia: string;
  fecha_expiracion: Date;
  nivel: string;
  ubicacion: string;
  cupos: number;
  aplicar_por: "Email" | "WorkHub";
}

export interface ActualizarTrabajoDTO {
  id_categoria: number;
  nombre_trabajo: string;
  descripcion: string;
  responsabilidades: string;
  salario_minimo: number;
  salario_maximo: number;
  modalidad: "presencial" | "remoto" | "híbrido";
  educacion: string;
  experiencia: string;
  fecha_expiracion: Date;
  nivel: string;
  ubicacion: string;
  cupos: number;
  aplicar_por: "Email" | "WorkHub";
}
