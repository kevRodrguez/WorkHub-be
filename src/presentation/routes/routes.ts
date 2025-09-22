import { Router } from "express";
import { CategoriaCandidateRoutes } from "./candidate/categoria.routes";
import { PerfilCandidateRoutes } from "./candidate/perfiles.routes";


export class CandidateRoutes {
    static get routes(): Router {
        const router = Router();


        router.use("/categorias", CategoriaCandidateRoutes.routes);
        router.use("/perfiles", PerfilCandidateRoutes.routes);



        return router;
    }
}
