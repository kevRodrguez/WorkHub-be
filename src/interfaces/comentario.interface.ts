export interface Comentario {
  id_comentario: number;
  id_blog: number;
  id_perfil: number;
  contenido: string;
  fecha: Date;
}

export interface CrearComentario {
  id_blog: number;
  id_perfil: number;
  contenido: string;
  fecha: Date;
}
