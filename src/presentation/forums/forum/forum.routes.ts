import { Router } from "express";
import { ForoService } from "../../../services/forum/forum.service";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";
import { ForoController } from "./forum.controller";

export class ForumRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", ForoController.getForos);

    router.get(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      ForoController.getForoById
    );

    router.post(
      "/",
      ExpressValidators.crearForo(),
      handleValidationErrors,
      ForoController.crearForo
    );

    router.put(
      "/:id",
      ExpressValidators.actualizarCategoria(),
      handleValidationErrors,
      ForoController.actualizarForo
    );

    router.delete(
      "/:id",
      ExpressValidators.validarIdParametro(),
      handleValidationErrors,
      ForoController.eliminarForo
    );

    return router;
  }
}
