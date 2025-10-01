import { NextFunction, Request, Response } from "express";
import { AplicacionesEnterpriseService } from "../../../services/enterprise/aplicaciones.service";

export const AplicacionesEnterpriseController = {
  async getAplicacionesByTrabajoId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id_trabajo } = req.params;
    console.log(id_trabajo);

    try {
      let aplicaciones =
        await AplicacionesEnterpriseService.getAplicacionesByIdTrabajo(
          parseInt(id_trabajo)
        );
      aplicaciones = aplicaciones.map((app) => {
        return {
          ...app,
          fotoUrl: `https://pzplniihhetjlxdkhljz.supabase.co/storage/v1/object/public/Archivos_WorkHub/${app.id_usuario}/avatar.png`,
        };
      });
      res.status(200).json({
        success: true,
        data: aplicaciones,
        message: "Aplicaciones obtenidas exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async getAplicacionesByIdEmpresa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id_empresa } = req.params;
    console.log(id_empresa);

    try {
      let aplicaciones =
        await AplicacionesEnterpriseService.getAplicacionesByIdEmpresa(
          parseInt(id_empresa)
        )
      aplicaciones = aplicaciones.map((app) => {
        return {
          ...app,
          fotoUrl: `https://pzplniihhetjlxdkhljz.supabase.co/storage/v1/object/public/Archivos_WorkHub/${app.id_usuario}/avatar.png`,
        };
      });
      res.status(200).json({
        success: true,
        data: aplicaciones,
        message: "Aplicaciones obtenidas exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateEstadoAplicacion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id_aplicacion } = req.params;
    const { nuevo_estado } = req.body;
    console.log(id_aplicacion, nuevo_estado);

    try {
      const aplicacionActualizada =
        await AplicacionesEnterpriseService.updateEstadoAplicacion(
          parseInt(id_aplicacion),
          nuevo_estado
        );
      res.status(200).json({
        success: true,
        data: aplicacionActualizada,
        message: "Estado de la aplicación actualizado exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },
};
