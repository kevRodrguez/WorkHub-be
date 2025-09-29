import { Router } from "express";
import { AplicacionesEnterpriseController } from "./aplicaciones.controller";
import { runValidations } from "../../../middlewares/validators/validator";
import {
  getAplicacionesByTrabajoIdValidator,
  updateEstadoAplicacionValidator,
} from "../../../middlewares/validators/aplicaciones.validator";

export class AplicacionesEnterpriseRoutes {
  static get routes(): Router {
    const router = Router();
    router.get(
      "/:id_trabajo",
      runValidations(getAplicacionesByTrabajoIdValidator),
      AplicacionesEnterpriseController.getAplicacionesByTrabajoId
    );
    router.put(
      "/:id_aplicacion",
      runValidations(updateEstadoAplicacionValidator),
      AplicacionesEnterpriseController.updateEstadoAplicacion
    );

    return router;
  }
}
