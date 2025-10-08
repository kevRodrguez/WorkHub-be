import { Router } from "express";
import { LinkController } from "./link.controller";

export class LinkRoutes {
  static get routes() {
    const router = Router();

    router.get("/", LinkController.getLinks);
    router.post("/", LinkController.crearLink);
    router.delete("/:id", LinkController.eliminarLink);

    return router;
  }
}