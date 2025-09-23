import { Router } from "express";
import { CategoriasCandidateController } from "./categorias.controller";

export class CategoriaCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", CategoriasCandidateController.getCategorias);
    router.get("/:id", CategoriasCandidateController.getCategoriaById);
    router.post("/", CategoriasCandidateController.insertarCategoria);
    router.put("/:id", CategoriasCandidateController.actualizarCategoria);
    router.delete("/:id", CategoriasCandidateController.eliminarCategoria);

    return router;
  }
}
