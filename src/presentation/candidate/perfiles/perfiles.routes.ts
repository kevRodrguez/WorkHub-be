import { Router } from "express";
import { PerfilesCandidateController } from "./perfiles.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class PerfilCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", PerfilesCandidateController.getPerfiles);

    router.get(
      "/:id", 
      handleValidationErrors,
      PerfilesCandidateController.getPerfilById
    );

    router.post(
      "/",
      ExpressValidators.crearPerfilCandidato(),
      handleValidationErrors,
      PerfilesCandidateController.insertarPerfil
    );

    router.put(
      "/:id",
      ExpressValidators.actualizarPerfilCandidato(),
      handleValidationErrors,
      PerfilesCandidateController.actualizarPerfil
    );

    router.delete(
      "/:id",
      handleValidationErrors,
      PerfilesCandidateController.eliminarPerfil
    );

    return router;
  }
}
