import { Router } from "express";
import { CandidateRoutes } from "./candidate/routes";
import { EnterpriseRoutes } from "./enterprise/routes";
import { TrabajosRoutes } from "./shared/trabajos/trabajos.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas

    // Rutas del candidato
    router.use("/api/candidate", CandidateRoutes.routes);

    // Rutas de la empresa
    router.use("/api/enterprise", EnterpriseRoutes.routes);

    // Rutas compartidas
    router.use("/api/trabajos", TrabajosRoutes.routes);

    return router;
  }
}
