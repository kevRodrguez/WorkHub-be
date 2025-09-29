import { Router } from "express";
import { TrabajosEnterpriseController } from "./trabajos.controller";
import {
  insertarTrabajoValidator,
  updateTrabajoValidator,
} from "../../../middlewares/validators/enterprise/trabajos.validator";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class TrabajosEnterpriseRoutes {
  static get routes(): Router {
    const router = Router();

    router.post(
      "/",
      insertarTrabajoValidator,
      handleValidationErrors,
      TrabajosEnterpriseController.insertarTrabajo
    );
    router.put(
      "/:id_trabajo",
      updateTrabajoValidator,
      handleValidationErrors,
      TrabajosEnterpriseController.actualizarTrabajo
    );
    router.delete("/:id_trabajo", TrabajosEnterpriseController.eliminarTrabajo);

    return router;
  }
}
