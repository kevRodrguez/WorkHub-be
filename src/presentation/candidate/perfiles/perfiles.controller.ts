import { Request, Response, NextFunction } from "express";
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
  async getPerfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const perfiles = await PerfilesCandidateService.getPerfiles();
      res.json({
        success: true,
        data: perfiles,
        message: "Perfiles obtenidos exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async getPerfilById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const perfil = await PerfilesCandidateService.getPerfilById(id);

      res.json({
        success: true,
        data: perfil,
        message: "Perfil obtenido exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async insertarPerfil(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  },

  async actualizarPerfil(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  },

  async eliminarPerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const perfilEliminado = await PerfilesCandidateService.eliminarPerfil(id);

      res.json({
        success: true,
        data: perfilEliminado,
        message: "Perfil eliminado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async getTrabajosAplicados(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTrabajosAplicados(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos aplicados obtenidos exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async getTopTrabajosAplicados(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTopTrabajosAplicados(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos aplicados obtenidos exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async getTrabajosFavoritos(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const trabajos = await PerfilesCandidateService.getTrabajosFavoritos(id);

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos favoritos obtenidos exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },
  async getProfileStats(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const stats = await PerfilesCandidateService.getProfileStats(id);

      res.json({
        success: true,
        data: stats,
        message: "Estadísticas del perfil obtenidas exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async getAlertasTrabajos(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as UUID;
      const alertas = await PerfilesCandidateService.getAlertasTrabajos(id);

      res.json({
        success: true,
        data: alertas,
        message: "Alertas de trabajos obtenidas exitosamente",
      });
    } catch (error) {
      next(error);
    }
  },

  async actualizarEstadoNotificacion(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  },

  async eliminarFavorito(req: Request, res: Response, next: NextFunction) {
    try {
      const id_favorito = parseInt(req.params.id);

      const favoritoEliminado = await PerfilesCandidateService.eliminarFavorito(id_favorito);

      res.json({
        success: true,
        data: favoritoEliminado,
        message: "Favorito eliminado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  }
};
