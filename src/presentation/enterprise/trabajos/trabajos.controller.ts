import { Request, Response } from "express";
import {
  CrearTrabajoDTO,
  ActualizarTrabajoDTO,
  Trabajo,
} from "../../../interfaces/trabajos.interface";
import { TrabajosService } from "../../../services/enterprise/trabajos.service";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";

export const TrabajosEnterpriseController = {
  async insertarTrabajo(req: Request, res: Response) {
    try {
      const datos: CrearTrabajoDTO = req.body;
      const nuevoTrabajo = await TrabajosService.insertarTrabajo(datos);

      res.status(201).json({
        success: true,
        data: nuevoTrabajo,
        message: "Trabajo creado exitosamente",
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

  async actualizarTrabajo(req: Request, res: Response) {
    const { id_trabajo } = req.params;

    try {
      const datos: ActualizarTrabajoDTO = req.body;
      const trabajoActualizado = await TrabajosService.actualizarTrabajo(
        parseInt(id_trabajo),
        datos
      );

      res.status(200).json({
        success: true,
        data: trabajoActualizado,
        message: "Trabajo actualizado exitosamente",
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

  async eliminarTrabajo(req: Request, res: Response) {
    const { id_trabajo } = req.params;

    try {
      const trabajoEliminado = await TrabajosService.eliminarTrabajo(
        parseInt(id_trabajo)
      );

      res.status(200).json({
        success: true,
        data: trabajoEliminado,
        message: "Trabajo eliminado exitosamente",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
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
};
