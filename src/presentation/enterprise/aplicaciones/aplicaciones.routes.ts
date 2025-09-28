import { Router } from "express";
import { AplicacionesEnterpriseController } from "./aplicaciones.controller";
import { runValidations } from "../../../middlewares/validators/validator";
import { getAplicacionesByTrabajoIdValidator } from "../../../middlewares/validators/aplicaiones.validator";


export class AplicacionesEnterpriseRoutes {
  static get routes(): Router {
    const router = Router();
    router.get('/:id_trabajo', runValidations(getAplicacionesByTrabajoIdValidator), AplicacionesEnterpriseController.getAplicacionesByTrabajoId)


    return router;
  }
}
