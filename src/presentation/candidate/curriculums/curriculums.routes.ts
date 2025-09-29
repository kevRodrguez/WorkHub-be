import { Router } from "express";
import { CurriculumsCandidateController } from "./curriculums.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class CurriculumsCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", CurriculumsCandidateController.getCurriculums);
    router.get(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      CurriculumsCandidateController.getCurriculumById
    );
    router.post(
      "/",
      ExpressValidators.insertarCurriculum(),
      handleValidationErrors,
      CurriculumsCandidateController.insertarCurriculum
    );
    router.put(
      "/:id",
      ExpressValidators.actualizarCurriculum(),
      handleValidationErrors,
      CurriculumsCandidateController.actualizarCurriculum
    );
    router.delete(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      CurriculumsCandidateController.eliminarCurriculum
    );

    return router;
  }
}
