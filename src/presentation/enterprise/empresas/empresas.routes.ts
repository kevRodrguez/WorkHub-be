import { Router } from "express";
import { EmpresasEnterpriseController } from "./empresas.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";
import { runValidations } from "../../../middlewares/validators/validator";
import { getEmpresasValidator } from "../../../middlewares/validators/enterprise/empresas.validator";

export class EmpresasEnterpriseRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/:id_empresa', runValidations(getEmpresasValidator), EmpresasEnterpriseController.getEmpresas);

    return router;
  }
}
