import { ComentarioService } from "../../../services/blog/comentario.service";
import { Request, Response } from "express";
import {
  BusinessRuleError,
  NotFoundError,
  ValidationError,
} from "../../../utils/errors";
import { CrearComentario } from "../../../interfaces/comentario.interface";

export const ComentarioController = {
  async getComentarios(req: Request, res: Response) {
    const comentarios = await ComentarioService.getComentarios();
    try {
      res.json({
        success: true,
        data: comentarios,
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

  async getComentariosByBlogId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const comentarios = await ComentarioService.getComentariosByBlog(
        parseInt(id)
      );
      if (!comentarios) {
        throw new NotFoundError("No se encontraron comentarios para este blog");
      }
      res.json({
        success: true,
        data: comentarios,
        message: "Comentarios obtenidos con éxito",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
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

  async crearBlog(req: Request, res: Response) {
    try {
      const data: CrearComentario = req.body;
      const blog = await ComentarioService.crearComentario(
        data.id_perfil,
        data.id_blog,
        data.contenido,
        data.fecha
      );
      res.json({
        succes: true,
        data: blog,
        message: "Comentario creado con éxito",
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
};
