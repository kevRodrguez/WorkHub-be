import { Request, Response } from "express";
import { CategoriasService } from "../../../services/candidate/categorias.service";
import {
  CrearCategoriaDTO,
  ActualizarCategoriaDTO,
} from "../../../interfaces/categoria.interface";
import {
  ValidationError,
  NotFoundError,
  BusinessRuleError,
} from "../../../utils/errors";

export const CategoriasCandidateController = {
  async getCategorias(req: Request, res: Response) {
    try {
      const categorias = await CategoriasService.getCategorias();
      res.json({
        success: true,
        data: categorias,
        message: "Categorías obtenidas exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async getCategoriaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const categoria = await CategoriasService.getCategoriaById(id);

      res.json({
        success: true,
        data: categoria,
        message: "Categoría obtenida exitosamente",
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

  async insertarCategoria(req: Request, res: Response) {
    try {
      const datos: CrearCategoriaDTO = req.body;
      const nuevaCategoria = await CategoriasService.insertarCategoria(datos);

      res.status(201).json({
        success: true,
        data: nuevaCategoria,
        message: "Categoría creada exitosamente",
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

  async actualizarCategoria(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const datos: ActualizarCategoriaDTO = req.body;
      const categoriaActualizada = await CategoriasService.actualizarCategoria(
        id,
        datos
      );

      res.json({
        success: true,
        data: categoriaActualizada,
        message: "Categoría actualizada exitosamente",
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

  async eliminarCategoria(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const categoriaEliminada = await CategoriasService.eliminarCategoria(id);

      res.json({
        success: true,
        data: categoriaEliminada,
        message: "Categoría eliminada exitosamente",
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
};
