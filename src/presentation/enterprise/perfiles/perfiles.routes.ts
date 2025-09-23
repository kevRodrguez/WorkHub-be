import { Router } from "express";
import { PerfilesCandidateController } from "../../candidate/perfiles/perfiles.controller";

export class PerfilEnterpriseRoutes {
    static get routes(): Router {
        const router = Router();

        router.get("/", PerfilesCandidateController.getPerfiles);
        router.get("/:id", PerfilesCandidateController.getPerfilById);
        router.post("/", PerfilesCandidateController.insertarPerfil);

        return router;
    }
}
