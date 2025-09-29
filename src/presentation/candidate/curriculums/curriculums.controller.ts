import { Request, Response } from "express";
import { CurriculumsService } from "../../../services/candidate/curriculums.service";
import {
  CrearCurriculumDTO,
  ActualizarCurriculumDTO,
} from "../../../interfaces/curriculum.interface";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";

export const CurriculumsCandidateController = {
  async getCurriculums(req: Request, res: Response) {
    try {
      const curriculums = await CurriculumsService.getCurriculums();

      res.json({
        success: true,
        data: curriculums,
        message: "Currículums obtenidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async getCurriculumById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const curriculum = await CurriculumsService.getCurriculumById(id);

      res.json({
        success: true,
        data: curriculum,
        message: "Currículum obtenido exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async insertarCurriculum(req: Request, res: Response) {
    try {
      const datos: Partial<CrearCurriculumDTO> = req.body;
      const nuevoCurriculum = await CurriculumsService.insertarCurriculum(
        datos
      );

      res.status(201).json({
        success: true,
        data: nuevoCurriculum,
        message: "Currículum insertado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async actualizarCurriculum(req: Request, res: Response) {
    try {
      const id_curriculum = parseInt(req.params.id, 10);
      const datos: ActualizarCurriculumDTO = req.body;

      const curriculumActualizado =
        await CurriculumsService.actualizarCurriculum(id_curriculum, datos);

      res.json({
        success: true,
        data: curriculumActualizado,
        message: "Currículum actualizado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async eliminarCurriculum(req: Request, res: Response) {
    try {
      const id_curriculum = parseInt(req.params.id, 10);
      const curriculumEliminado = await CurriculumsService.eliminarCurriculum(
        id_curriculum
      );

      res.json({
        success: true,
        data: curriculumEliminado,
        message: "Currículum eliminado exitosamente",
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
