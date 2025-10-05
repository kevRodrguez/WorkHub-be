import { Router } from "express";
import { RespuestaForoController } from "./answerForum.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { validateHeaderName } from "http";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";


export class RespuestaRoutes {
    static get routes(): Router {
        const router = Router();

        router.get("/", RespuestaForoController.getRespuestas);

        router.get("/:id",
            ExpressValidators.validarIdParametro(),
            handleValidationErrors,
            RespuestaForoController.getRespuestaById
        );

        router.post("/",
            ExpressValidators.validarRespuesta,
            handleValidationErrors,
            RespuestaForoController.crearRespuesta
        );

        router.put("/:id",
            ExpressValidators.validarRespuesta,
            handleValidationErrors,
            RespuestaForoController.actualizarRespuesta
        );

        router.delete("/:id",
            ExpressValidators.validarIdParametro(),
            handleValidationErrors,
            RespuestaForoController.eliminarRespuesta
        );

        return router;
    }
}