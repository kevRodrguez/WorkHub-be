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
      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos obtenidos exitosamente",
      })
    } catch (error) {
      return next(error);
    }
  },


};
