import { Router } from "express";
import { CandidateRoutes } from "./routes/routes";


export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas

    // Rutas del candidato
    router.use("/api/candidate", CandidateRoutes.routes);

    


    // Rutas de la empresa


    return router;
  }
}
