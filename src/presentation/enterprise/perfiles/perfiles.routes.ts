import { Router } from "express";
import { PerfilesEnterpriseController } from "./perfiles.controller";

export class PerfilEnterpriseRoutes {
    static get routes(): Router {
        const router = Router();

        router.get("/", PerfilesEnterpriseController.getPerfiles);
        router.get("/:id", PerfilesEnterpriseController.getPerfilById);
        router.post("/", PerfilesEnterpriseController.insertarPerfil);


        return router;
    }
}
