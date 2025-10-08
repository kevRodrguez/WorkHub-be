import { ComentarioRepository } from "../../data/repositories/blog/comentario.repository";
import { Comentario } from "../../interfaces/comentario.interface";

export const ComentarioService = {
  async getComentarios(): Promise<Comentario[]> {
    const blog = await ComentarioRepository.getComentarios();
    return blog;
  },

  async getComentariosByBlog(id_blog: number): Promise<Comentario[]> {
    const comentarios = await ComentarioRepository.getComentariosByBlog(
      id_blog
    );
    return comentarios;
  },

  async crearComentario(
    id_perfil: number,
    id_blog: number,
    contenido: string,
    fecha: Date
  ): Promise<Comentario> {
    const comentario = await ComentarioRepository.createComentario(
      id_perfil,
      id_blog,
      contenido,
      fecha
    );
    return comentario;
  },
};
