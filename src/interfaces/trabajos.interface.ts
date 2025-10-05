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
  nivel: string;
  ubicacion: string;
}

export interface CrearTrabajoDTO {
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
