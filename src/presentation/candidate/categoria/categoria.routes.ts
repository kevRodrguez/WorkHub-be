import { Router } from "express";
import { CategoriasCandidateController } from "./categorias.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class CategoriaCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", CategoriasCandidateController.getCategorias);

    router.get(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      CategoriasCandidateController.getCategoriaById
    );

    router.post(
      "/",
      ExpressValidators.crearCategoria(),
      handleValidationErrors,
      CategoriasCandidateController.insertarCategoria
    );

    router.put(
      "/:id",
      ExpressValidators.actualizarCategoria(),
      handleValidationErrors,
      CategoriasCandidateController.actualizarCategoria
    );

    router.delete(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      CategoriasCandidateController.eliminarCategoria
    );

    return router;
  }
}
