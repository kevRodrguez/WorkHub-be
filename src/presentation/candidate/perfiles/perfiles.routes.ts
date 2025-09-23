import { Router } from "express";
import { PerfilesCandidateController } from "./perfiles.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class PerfilCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", PerfilesCandidateController.getPerfiles);

    router.get("/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      PerfilesCandidateController.getPerfilById
    );

    router.post("/",
      ExpressValidators.crearPerfilCandidato(),
      handleValidationErrors,
      PerfilesCandidateController.insertarPerfil
    );

    return router;
  }
}
