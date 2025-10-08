export interface Respuesta {
    id_respuesta_foro: number,
    id_foro: number,
    id_perfil: number,
    contenido: string,
    fecha: Date
}

export interface CrearRespuestaDTO{
    id_foro: number,
    id_perfil: number,
    contenido: string,
    fecha: Date
}

export interface ActualizarRespuestaDTO {
  id_foro: number;
  id_perfil: number;
  titulo: string;
  contenido: string;
  fecha: Date;
}
