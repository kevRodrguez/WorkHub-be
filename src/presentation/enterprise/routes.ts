import { Router } from "express";
import { PerfilEnterpriseRoutes } from "./perfiles/perfiles.routes";
import { AplicacionesEnterpriseRoutes } from "./aplicaciones/aplicaciones.routes";


export class EnterpriseRoutes {
    static get routes(): Router {
        const router = Router();

        // Definir las rutas
        router.use("/perfiles", PerfilEnterpriseRoutes.routes);
        // router.use("/categorias", CategoriaEnterpriseRoutes.routes);
        router.use("/aplicaciones", AplicacionesEnterpriseRoutes.routes)

        return router;
    }
}
