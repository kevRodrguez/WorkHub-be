import { RespuestaService } from "../../../services/forum/answerForum.service";
import { Request, Response } from "express";
import {
  BusinessRuleError,
  NotFoundError,
  ValidationError,
} from "../../../utils/errors";
import { CrearRespuestaDTO } from "../../../interfaces/anwserForum.interface";
export const RespuestaForoController = {
  async getRespuestas(req: Request, res: Response) {
    const respuestas = await RespuestaService.getRespuestas();
    try {
      res.json({
        succes: true,
        data: respuestas,
        message: "Respuestas obtenidas",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async getRespuestaById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const respuesta = await RespuestaService.getRespuestaById(id);
      res.json({
        success: true,
        data: respuesta,
        message: "Respuesta obtenida",
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

  async getRespuestasByUserId(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const respuestas = await RespuestaService.getRespuestasByUserId(id);
      res.json({
        success: true,
        data: respuestas,
        message: "Respuestas obtenidas",
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
  
  async getRespuestasByForoId(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      const respuestas = await RespuestaService.getRespuestasByForoId(id);
      res.json({
        success: true,
        data: respuestas,
        message: "Respuestas obtenidas",
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

  async crearRespuesta(req: Request, res: Response) {
    try {
      const datos: CrearRespuestaDTO = req.body;
      const respuesta = await RespuestaService.crearRespuesta(datos);
      res.status(201).json({
        success: true,
        data: respuesta,
        message: "Respuesta creada",
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

  async actualizarRespuesta(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const datos = req.body;
    const contenido = datos.contenido;

    console.log("Datos recibidos para actualizar:", datos);
    try {
      const respuesta = await RespuestaService.actualizarRespuesta(id, contenido);
      res.json({
        success: true,
        data: respuesta,
        message: "Respuesta actualizada",
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

  async eliminarRespuesta(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      await RespuestaService.eliminarRespuesta(id);
      res.json({
        success: true,
        message: "Respuesta eliminada",
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
