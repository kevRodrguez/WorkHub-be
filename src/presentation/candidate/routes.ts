import { Router } from "express";
import { PerfilCandidateRoutes } from "./perfiles/perfiles.routes";
import { CategoriaCandidateRoutes } from "./categoria/categoria.routes";
import { CurriculumsCandidateRoutes } from "./curriculums/curriculums.routes";
import { EnterprisesRoutes } from "./enterprise/enterprises.routes";

export class CandidateRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/perfiles", PerfilCandidateRoutes.routes);
    router.use("/categorias", CategoriaCandidateRoutes.routes);
    router.use("/curriculums", CurriculumsCandidateRoutes.routes);
    router.use("/empresas", EnterprisesRoutes.routes);

    return router;
  }
}
