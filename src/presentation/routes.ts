import { Router } from "express";
import { CandidateRoutes } from "./candidate/routes";
import { EnterpriseRoutes } from "./enterprise/routes";
import { TrabajosRoutes } from "./shared/trabajos/trabajos.routes";
import { ForumRoutes } from "./forums/forum/forum.routes";
import { RespuestaRoutes } from "./forums/answer/answerForum.routes";
import { ResourcesRoutes } from "./recursos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas

    //Rutas de foros
    router.use("/api/foro", ForumRoutes.routes);
    router.use("/api/respuesta", RespuestaRoutes.routes);

    // Rutas de recursos
    router.use("/api/recursos", ResourcesRoutes.routes);

    // Rutas del candidato
    router.use("/api/candidate", CandidateRoutes.routes);

    // Rutas de la empresa
    router.use("/api/enterprise", EnterpriseRoutes.routes);

    // Rutas compartidas
    router.use("/api/trabajos", TrabajosRoutes.routes);

    return router;
  }
}
