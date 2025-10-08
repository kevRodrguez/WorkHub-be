export interface Curriculum {
  id_curriculum: number;
  id_perfil: number;
  url_curriculum: string;
  nombre_archivo: string;
  tamano_archivo: number;
  fecha_subida: Date;
}

export interface CrearCurriculumDTO {
  id_perfil: number;
  url_curriculum: string;
  nombre_archivo: string;
  tamano_archivo: number;
}

export interface ActualizarCurriculumDTO {
  nombre_archivo: string;
}
