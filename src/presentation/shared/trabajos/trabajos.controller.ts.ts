import { NextFunction, Request, Response } from "express";
import { TrabajosService } from "../../../services/shared/trabajos.service";

export const TrabajosController = {
  async getTrabajos(req: Request, res: Response, next: NextFunction) {
    try {
      const trabajos = await TrabajosService.getTrabajos();

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos obtenidos exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async getTrabajosByPerfilId(req: Request, res: Response, next: NextFunction) {
    const { id_perfil } = req.params;
    try {
      const trabajos = await TrabajosService.getTrabajosByPerfilId(
        parseInt(id_perfil)
      );

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos obtenidos exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async getTrabajosActivos(req: Request, res: Response, next: NextFunction) {
    try {
      const trabajos = await TrabajosService.getTrabajosActivos();

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos obtenidos exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },

  async getTrabajosById(req: Request, res: Response, next: NextFunction) {
    const { id_trabajo } = req.params;
    try {
      const trabajos = await TrabajosService.getTrabajosById(parseInt(id_trabajo));

      res.json({
        success: true,
        data: trabajos,
        message: "Trabajos obtenidos exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },
};
