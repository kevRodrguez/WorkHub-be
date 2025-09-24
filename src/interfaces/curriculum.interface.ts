export interface Curriculum {
  id_curriculum: number;
  id_perfil: number;
  url_curriculum: string;
}

export interface CrearCurriculumDTO {
  id_perfil: number;
  url_curriculum: string;
}

export interface ActualizarCurriculumDTO {
  url_curriculum: string;
}
