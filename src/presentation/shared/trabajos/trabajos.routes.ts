import { Request, Response, Router } from "express";
import { TrabajosController } from "./trabajos.controller.ts.js";
import { ExpressValidators } from "../../../utils/express-validators.js";
import { handleValidationErrors } from "../../../utils/validation-error.middleware.js";

import { getTrabajoByIdValidator } from "../../../middlewares/validators/shared/trabajos.validator.js";
import { runValidations } from "../../../middlewares/validators/validator";

export class TrabajosRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/:perfil_id', runValidations(getTrabajoByIdValidator), TrabajosController.getTrabajos)

    return router;
  }
}
