import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller";

export class CategoriaRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", CategoriasController.getCategorias);

    return router;
  }
}
