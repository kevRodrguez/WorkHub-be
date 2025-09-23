import { Router } from "express";
import { PerfilCandidateRoutes } from "./perfiles/perfiles.routes";
import { CategoriaCandidateRoutes } from "./categoria/categoria.routes";


export class CandidateRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.use("/perfiles", PerfilCandidateRoutes.routes);
        router.use("/categorias", CategoriaCandidateRoutes.routes);


        return router;
    }
}
