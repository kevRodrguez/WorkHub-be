import { Request, Response } from "express";
import { CurriculumsService } from "../../../services/candidate/curriculums.service";
import { CrearCurriculumDTO } from "../../../interfaces/curriculum.interface";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";

export const CurriculumsCandidateController = {
  async getCurriculumsByPerfilId(req: Request, res: Response) {
    try {
      const idPerfil = parseInt(req.params.idPerfil, 10);
      
      if (isNaN(idPerfil)) {
        return res.status(400).json({
          success: false,
          message: "El ID del perfil no es válido",
        });
      }

      const curriculums = await CurriculumsService.getCurriculumsByPerfilId(idPerfil);

      res.json({
        success: true,
        data: curriculums,
        message: curriculums.length > 0 
          ? "CVs obtenidos exitosamente" 
          : "No se encontraron CVs para este perfil",
      });
    } catch (error) {
      if (error instanceof BusinessRuleError) {
        res.status(400).json({
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

  async insertarCurriculum(req: Request, res: Response) {
    try {
      const datos: CrearCurriculumDTO = {
        id_perfil: req.body.id_perfil,
        url_curriculum: req.body.url_curriculum,
        nombre_archivo: req.body.nombre_archivo,
        tamano_archivo: req.body.tamano_archivo,
      };

      const curriculum = await CurriculumsService.insertarCurriculum(datos);

      res.status(201).json({
        success: true,
        data: curriculum,
        message: "CV creado exitosamente",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(400).json({
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

  async actualizarNombreCurriculum(req: Request, res: Response) {
    try {
      const idCurriculum = parseInt(req.params.idCurriculum, 10);
      const { nombre_archivo } = req.body;

      if (isNaN(idCurriculum)) {
        return res.status(400).json({
          success: false,
          message: "El ID del currículum no es válido",
        });
      }

      if (!nombre_archivo) {
        return res.status(400).json({
          success: false,
          message: "El nombre del archivo es requerido",
        });
      }

      const curriculum = await CurriculumsService.actualizarNombreCurriculum(
        idCurriculum,
        nombre_archivo
      );

      res.json({
        success: true,
        data: curriculum,
        message: "Nombre actualizado exitosamente",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(400).json({
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

  async eliminarCurriculum(req: Request, res: Response) {
    try {
      const idCurriculum = parseInt(req.params.idCurriculum, 10);

      if (isNaN(idCurriculum)) {
        return res.status(400).json({
          success: false,
          message: "El ID del currículum no es válido",
        });
      }

      await CurriculumsService.eliminarCurriculum(idCurriculum);

      res.json({
        success: true,
        message: "CV eliminado exitosamente",
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
