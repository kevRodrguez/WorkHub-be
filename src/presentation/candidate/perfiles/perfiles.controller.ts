import { Request, Response } from "express";
import { PerfilesCandidateService } from "../../../services/candidate/perfiles.service";
import { CrearPerfilDTO, ActualizarPerfilDTO } from "../../../interfaces/perfil.candidate.interface";
import { ValidationError, NotFoundError, BusinessRuleError } from "../../../utils/errors";

export const PerfilesCandidateController = {
  async getPerfiles(req: Request, res: Response) {
    try {
      const perfiles = await PerfilesCandidateService.getPerfiles();
      res.json({
        success: true,
        data: perfiles,
        message: "Perfiles obtenidos exitosamente"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message
      });
    }
  },

  async getPerfilById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const perfil = await PerfilesCandidateService.getPerfilById(id);

      res.json({
        success: true,
        data: perfil,
        message: "Perfil obtenido exitosamente"
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message
        });
      }
    }
  },

  async insertarPerfil(req: Request, res: Response) {
    try {
      const datos: CrearPerfilDTO = {
        ...req.body,
        fecha_nacimiento_fundacion: new Date(req.body.fecha_nacimiento_fundacion)
      };

      const nuevoPerfil = await PerfilesCandidateService.insertarPerfil(datos);

      res.status(201).json({
        success: true,
        data: nuevoPerfil,
        message: "Perfil creado exitosamente"
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message
        });
      }
    }
  },

  async actualizarPerfil(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const datos: ActualizarPerfilDTO = {
        ...req.body,
        fecha_nacimiento_fundacion: new Date(req.body.fecha_nacimiento_fundacion)
      };

      const perfilActualizado = await PerfilesCandidateService.actualizarPerfil(id, datos);

      res.json({
        success: true,
        data: perfilActualizado,
        message: "Perfil actualizado exitosamente"
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message
        });
      }
    }
  },

  async eliminarPerfil(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const perfilEliminado = await PerfilesCandidateService.eliminarPerfil(id);

      res.json({
        success: true,
        data: perfilEliminado,
        message: "Perfil eliminado exitosamente"
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error interno del servidor",
          error: (error as Error).message
        });
      }
    }
  },
};
