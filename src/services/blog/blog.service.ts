import { link } from "fs";
import { BlogRepository } from "../../data/repositories/blog/blog.repository";
import { actualizarBlogDTO, Blog, CrearBlogDTO } from "../../interfaces/blog.interface";
import { NotFoundError } from "../../utils/errors";

export const BlogService = {
  async getBlogById(id: number): Promise<Blog> {
    const blog = await BlogRepository.getBlogById(id);

    if (!blog) {
      throw new NotFoundError(`Blog con ID ${id} no encontrado`);
    }

    return blog;
  },

  async getBlogs(): Promise<Blog[]> {
    const blogs = await BlogRepository.getBlogs();
    return blogs.map((blog) => ({
      ...blog,
      id_blog: blog.id_blog,
      id_categoria: blog.id_categoria,
      id_perfil: blog.id_perfil,
      link_miniatura: blog.link_miniatura,
      titulo: blog.titulo,
      contenido: blog.contenido,
      fecha: blog.fecha,
    }));
  },

  async crearBlog(
    id_perfil: number,
    id_categoria: number,
    link_miniatura: string,
    titulo: string,
    contenido: string,
    fecha: Date
  ): Promise<CrearBlogDTO> {
    const blog = await BlogRepository.createBlog(
      id_perfil, id_categoria, link_miniatura, titulo, contenido, fecha
    );
    return blog;
  },

  async actualizarBlog(
    id_blog: number,
    datos: actualizarBlogDTO
  ): Promise<Blog | null> {
    await this.getBlogById(id_blog);

    return await BlogRepository.actualizarBlog(
      id_blog,
      datos.id_categoria,
      datos.id_perfil,
      datos.link_miniatura,
      datos.titulo,
      datos.contenido,
      datos.fecha
    );
  },

  async eliminarBlog(id_blog: number): Promise<Blog | null> {
    await this.getBlogById(id_blog);
    return await BlogRepository.eliminarForo(id_blog);
  },
};
