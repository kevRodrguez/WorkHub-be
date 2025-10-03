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
import { EmpresasEnterpriseService } from "../../../services/enterprise/empresas.service";

export const EmpresasEnterpriseController = {
  async getEmpresas(req: Request, res: Response, next: NextFunction) {

    const { id_empresa } = req.params;
    try {
      const empresas = await EmpresasEnterpriseService.getEmpresas(parseInt(id_empresa));
      return res.status(200).json({
        success: true,
        data: empresas,
        message: "Empresas obtenidas exitosamente",
      });
    } catch (error) {
      return next(error);

    }

  },

  async seguirEmpresa(req: Request, res: Response, next: NextFunction) {
    const { id_seguidor, id_seguido } = req.body;
    try {
      const resultado = await EmpresasEnterpriseService.seguirEmpresa(
        parseInt(id_seguidor),
        parseInt(id_seguido)
      );
      return res.status(200).json({
        success: true,
        data: resultado,
        message: "Empresa seguida exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async dejarDeSeguirEmpresa(req: Request, res: Response, next: NextFunction) {
    const { id_seguidor, id_seguido } = req.body;
    try {
      const resultado = await EmpresasEnterpriseService.dejarDeSeguirEmpresa(
        parseInt(id_seguidor),
        parseInt(id_seguido)
      );
      return res.status(200).json({
        success: true,
        data: resultado,
        message: "Empresa dejada de seguir exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  }

};
