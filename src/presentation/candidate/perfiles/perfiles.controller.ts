import { Request, Response } from "express";
import { PerfilesCandidateService } from "../../../services/candidate/perfiles.service";
import {
  CrearPerfilDTO,
  ActualizarPerfilDTO,
} from "../../../interfaces/perfil.candidate.interface";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";
import { UUID } from "crypto";

export const PerfilesCandidateController = {
  async getPerfiles(req: Request, res: Response) {
    try {
      const perfiles = await PerfilesCandidateService.getPerfiles();
      res.json({
        success: true,
        data: perfiles,
        message: "Perfiles obtenidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async getPerfilById(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const perfil = await PerfilesCandidateService.getPerfilById(id);

      res.json({
        success: true,
        data: perfil,
        message: "Perfil obtenido exitosamente",
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

  async insertarPerfil(req: Request, res: Response) {
    try {
      const datos: CrearPerfilDTO = {
        ...req.body,
        fecha_nacimiento_fundacion: new Date(
          req.body.fecha_nacimiento_fundacion
        ),
        rol: 'candidato',
      };

      const nuevoPerfil = await PerfilesCandidateService.insertarPerfil(datos);

      res.status(201).json({
        success: true,
        data: nuevoPerfil,
        message: "Perfil creado exitosamente",
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

  async actualizarPerfil(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const datos: ActualizarPerfilDTO = {
        ...req.body,
        fecha_nacimiento_fundacion: new Date(
          req.body.fecha_nacimiento_fundacion
        ),
        rol: 'candidato',
      };

      const perfilActualizado = await PerfilesCandidateService.actualizarPerfil(
        id,
        datos
      );

      res.json({
        success: true,
        data: perfilActualizado,
        message: "Perfil actualizado exitosamente",
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

  async eliminarPerfil(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const perfilEliminado = await PerfilesCandidateService.eliminarPerfil(id);

      res.json({
        success: true,
        data: perfilEliminado,
        message: "Perfil eliminado exitosamente",
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

  async getTrabajosAplicados(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTrabajosAplicados(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos aplicados obtenidos exitosamente",
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

  async getTopTrabajosAplicados(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTopTrabajosAplicados(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos aplicados obtenidos exitosamente",
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

  async getTrabajosFavoritos(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTrabajosFavoritos(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos favoritos obtenidos exitosamente",
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
  async getProfileStats(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const stats = await PerfilesCandidateService.getProfileStats(id);

      res.json({
        success: true,
        data: stats,
        message: "Estadísticas del perfil obtenidas exitosamente",
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

  async getAlertasTrabajos(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const alertas = await PerfilesCandidateService.getAlertasTrabajos(id);

      res.json({
        success: true,
        data: alertas,
        message: "Alertas de trabajos obtenidas exitosamente",
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

  async actualizarEstadoNotificacion(req: Request, res: Response) {
    try {
      const id_notificacion = parseInt(req.params.id);
      const { leido } = req.body;

      const notificacion = await PerfilesCandidateService.actualizarEstadoNotificacion(
        id_notificacion,
        leido
      );

      res.json({
        success: true,
        data: notificacion,
        message: "Estado de notificación actualizado exitosamente",
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
  }
};
