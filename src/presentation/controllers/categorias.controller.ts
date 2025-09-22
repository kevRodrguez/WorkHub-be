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

  async getCategoriaById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const categoria = await CategoriasService.getCategoriaById(id);

      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ message: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async insertarCategoria(req: Request, res: Response) {
    try {
      const { nombre_categoria, descripcion } = req.body;
      const nuevaCategoria = await CategoriasService.insertarCategoria(
        nombre_categoria,
        descripcion
      );

      res.status(201).json(nuevaCategoria);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async actualizarCategoria(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { nombre_categoria, descripcion } = req.body;
      const categoriaActualizada = await CategoriasService.actualizarCategoria(
        id,
        nombre_categoria,
        descripcion
      );

      if (categoriaActualizada) {
        res.json("Categoría actualizada con éxito");
      } else {
        res.status(404).json({ message: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async eliminarCategoria(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const categoriaEliminada = await CategoriasService.eliminarCategoria(id);

      if (categoriaEliminada) {
        res.json("Categoría eliminada con éxito");
      } else {
        res.status(404).json({ message: "Categoría no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
