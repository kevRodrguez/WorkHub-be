import { NextFunction, Request, Response } from "express";
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
import { TrabajosService } from "../../../services/shared/trabajos.service";

export const TrabajosController = {
  async getTrabajos(req: Request, res: Response, next: NextFunction) {
    const { perfil_id } = req.params;
    try {
      const trabajos = await TrabajosService.getTrabajosByPerfilId(parseInt(perfil_id))
      res.json(trabajos)
    } catch (error) {
      return next(error);
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

};
