import { ForoService } from "../../../services/forum/forum.service";
import { Request, Response } from "express";
import {
  BusinessRuleError,
  NotFoundError,
  ValidationError,
} from "../../../utils/errors";
import { CrearForoDTO } from "../../../interfaces/forum.interface";

export const ForoController = {
  async getForos(req: Request, res: Response) {
    const foros = await ForoService.getForos();
    try {
      res.json({
        succes: true,
        data: foros,
        message: "Foros obtenidos con éxito",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async getForoById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const foro = await ForoService.getForoById(id);
      res.json({
        success: true,
        data: foro,
        message: "Foro obtenido con éxito",
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

  async getForosByUserId(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const foros = await ForoService.getForosByuserId(id);
      res.json({
        success: true,
        data: foros,
        message: "Foros obtenidos con éxito",
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

  async crearForo(req: Request, res: Response) {
    try {
      const datos: CrearForoDTO = req.body;
      const nuevoForo = await ForoService.crearForo(datos);
      res.status(201).json({
        success: true,
        data: nuevoForo,
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

  async actualizarForo(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { contenido } = req.body;
    try {
      const foroActualizado = await ForoService.actualizarContenidoForo(id, contenido);
      res.json({
        success: true,
        data: foroActualizado,
        message: "Foro actualizado con éxito",
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

  async eliminarForo(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      await ForoService.eliminarForo(id);
      res.json({
        success: true,
        message: "Foro eliminado con éxito",
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
