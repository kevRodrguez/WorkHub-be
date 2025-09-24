import { Router } from "express";
import { PerfilesEnterpriseController } from "./perfiles.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class PerfilEnterpriseRoutes {
    static get routes(): Router {
        const router = Router();

        router.post("/",
            ExpressValidators.crearPerfilEmpresa(),
            handleValidationErrors,
            PerfilesEnterpriseController.crearPerfil
        );

        router.get("/", PerfilesEnterpriseController.getPerfiles);

        router.get("/:id", (req, res) => {
            PerfilesEnterpriseController.getPerfilById(req, res);
        });

        router.put("/:id",
            ExpressValidators.actualizarPerfilEmpresa(),
            handleValidationErrors,
            PerfilesEnterpriseController.actualizarPerfil
        );

        router.delete("/:id",
            ExpressValidators.validarIdParametro(),
            handleValidationErrors,
            PerfilesEnterpriseController.eliminarPerfil
        );

        return router;
    }
}
