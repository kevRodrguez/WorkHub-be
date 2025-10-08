import { Router } from "express";
import { EnterprisesController } from "./enterprises.controller";

export class EnterprisesRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", EnterprisesController.getEnterprises);

    return router;
  }
}
