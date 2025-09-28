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
import { get } from "http";
import { AplicacionesEnterpriseService } from "../../../services/enterprise/aplicaciones.service";

export const AplicacionesEnterpriseController = {

  async getAplicacionesByTrabajoId(req: Request, res: Response, next: NextFunction) {
    const { id_trabajo } = req.params;
    console.log(id_trabajo)

    try {

      const aplicaciones = await AplicacionesEnterpriseService.getAplicacionesByIdTrabajo(parseInt(id_trabajo));
      res.status(200).json({
        success: true,
        data: aplicaciones,
        message: "Aplicaciones obtenidas exitosamente",
      })
    } catch (error) {
      return next(error);
    }
  },

};
