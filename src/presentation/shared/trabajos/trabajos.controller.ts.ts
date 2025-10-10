import { NextFunction, Request, Response } from "express";
import { TrabajosService } from "../../../services/shared/trabajos.service";
import { AgregarFavoritoDTO } from "../../../interfaces";

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

  async agregarFavorito(req: Request, res: Response, next: NextFunction) {
    try {
      const datos: AgregarFavoritoDTO = {
        id_perfil: parseInt(req.body.id_perfil),
        id_trabajo: parseInt(req.body.id_trabajo),
      };

      const favorito = await TrabajosService.agregarFavorito(datos);

      res.status(201).json({
        success: true,
        data: favorito,
        message: "Trabajo agregado a favoritos exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  },
};
