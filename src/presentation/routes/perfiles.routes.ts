import { Router } from "express";
import { PerfilesController } from "../controllers/perfiles.controller";

export class PerfilRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", PerfilesController.getPerfiles);
    router.get("/:id", PerfilesController.getPerfilById);
    router.post("/", PerfilesController.insertarPerfil);

    return router;
  }
}
