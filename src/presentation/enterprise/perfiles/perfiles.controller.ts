import { Request, Response } from "express";
import {
  CrearPerfilEmpresaDTO,
  ActualizarPerfilEmpresaDTO,
  PerfilEmpresa,
} from "../../../interfaces/perfil.enterprise.interface";
import { PerfilesEnterpriseService } from "../../../services/enterprise/perfiles.service";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";
import { UUID } from "crypto";

export const PerfilesEnterpriseController = {
  async crearPerfil(req: Request, res: Response) {
    try {
      const datos: CrearPerfilEmpresaDTO = req.body;

      const nuevoPerfil: PerfilEmpresa =
        await PerfilesEnterpriseService.createPerfil(datos);

      res.status(201).json({
        success: true,
        data: nuevoPerfil,
        message: "Perfil de empresa creado exitosamente",
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

  async getPerfiles(req: Request, res: Response) {
    try {
      const perfiles = await PerfilesEnterpriseService.getPerfiles();
      res.json({
        success: true,
        data: perfiles,
        message: "Perfiles de empresa obtenidos exitosamente",
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
      const perfil = await PerfilesEnterpriseService.getPerfilById(id);

      res.json({
        success: true,
        data: perfil,
        message: "Perfil de empresa obtenido exitosamente",
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

  async actualizarPerfil(req: Request, res: Response) {
    try {
      const id = req.params.id as UUID;
      const datos: ActualizarPerfilEmpresaDTO = {
        ...req.body,
        fecha_nacimiento_fundacion: req.body.fecha_nacimiento_fundacion
          ? new Date(req.body.fecha_nacimiento_fundacion)
          : undefined,
      };

      const perfilActualizado =
        await PerfilesEnterpriseService.actualizarPerfil(id, datos);

      res.json({
        success: true,
        data: perfilActualizado,
        message: "Perfil de empresa actualizado exitosamente",
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
      const perfilEliminado = await PerfilesEnterpriseService.eliminarPerfil(
        id
      );

      res.json({
        success: true,
        data: perfilEliminado,
        message: "Perfil de empresa eliminado exitosamente",
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
};
