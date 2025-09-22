import { Request, Response } from "express";
import { CategoriasService } from "../../services/categorias.service";

export const CategoriasController = {
  async getCategorias(req: Request, res: Response) {
    try {
      const categorias = await CategoriasService.getCategorias();

      res.json(categorias);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
