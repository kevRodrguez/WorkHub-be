import { Router } from "express";
import { AplicacionesEnterpriseController } from "./aplicaciones.controller";
import { runValidations } from "../../../middlewares/validators/validator";
import {
  getAplicacionesByIdEmpresaValidator,
  getAplicacionesByTrabajoIdValidator,
  updateEstadoAplicacionValidator,
  createAplicacionValidator,
} from "../../../middlewares/validators/enterprise/aplicaciones.validator";

export class AplicacionesEnterpriseRoutes {
  static get routes(): Router {
    const router = Router();

    router.post(
      "/",
      runValidations(createAplicacionValidator),
      AplicacionesEnterpriseController.createAplicacion
    );

    router.get(
      "/:id_trabajo",
      runValidations(getAplicacionesByTrabajoIdValidator),
      AplicacionesEnterpriseController.getAplicacionesByTrabajoId
    );

    router.get(
      "/by-empresa/:id_empresa",
      runValidations(getAplicacionesByIdEmpresaValidator),
      AplicacionesEnterpriseController.getAplicacionesByIdEmpresa
    );

    router.put(
      "/:id_aplicacion",
      runValidations(updateEstadoAplicacionValidator),
      AplicacionesEnterpriseController.updateEstadoAplicacion
    );

    router.post(
      "/:id_aplicacion",
      runValidations(updateEstadoAplicacionValidator),
      AplicacionesEnterpriseController.updateEstadoAplicacion
    );

    return router;
  }
}
