import { Router } from "express";
import { PerfilesCandidateController } from "../../controllers/candidate/perfiles.controller";

export class PerfilCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", PerfilesCandidateController.getPerfiles);
    router.get("/:id", PerfilesCandidateController.getPerfilById);
    router.post("/", PerfilesCandidateController.insertarPerfil);

    return router;
  }
}
