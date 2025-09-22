import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller";

export class CategoriaRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", CategoriasController.getCategorias);
    router.get("/:id", CategoriasController.getCategoriaById);
    router.post("/", CategoriasController.insertarCategoria);
    router.put("/:id", CategoriasController.actualizarCategoria);
    router.delete("/:id", CategoriasController.eliminarCategoria);

    return router;
  }
}
