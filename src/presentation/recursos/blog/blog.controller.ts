import {
  actualizarBlogDTO,
  Blog,
  CrearBlogDTO,
} from "../../../interfaces/blog.interface";
import { BlogService } from "../../../services/blog/blog.service";
import { Request, Response } from "express";
import {
  BusinessRuleError,
  NotFoundError,
  ValidationError,
} from "../../../utils/errors";

export const BlogController = {
  async getBlogs(req: Request, res: Response) {
    const blogs = await BlogService.getBlogs();
    try {
      res.json({
        success: true,
        data: blogs,
        message: "Blogs obtenidos con éxito",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async crearBlog(req: Request, res: Response) {
    try {
      const data: CrearBlogDTO = req.body;
      const blog = await BlogService.crearBlog(
        data.id_perfil,
        data.id_categoria,
        data.link_miniatura,
        data.titulo,
        data.contenido,
        data.fecha
      );
      res.json({
        succes: true,
        data: blog,
        message: "Foro creado con éxito",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field,
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message,
        });
      }
    }
  },

  async actualizarBlog(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const data: actualizarBlogDTO = req.body;
      const blog = await BlogService.actualizarBlog(id, data);
      res.json({
        succes42735: true,
        data: blog,
        message: "Blog actualizado con éxito",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field,
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message,
        });
      }
    }
  },

  async eliminarBlog(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      await BlogService.eliminarBlog(id);
      res.json({
        succes: true,
        message: "Blog eliminado",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field,
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message,
        });
      }
    }
  },
};
