import { Router } from "express";
import { CategoriaRoutes } from "../presentation/routes/categoria.routes";
import { PerfilRoutes } from "../presentation/routes/perfiles.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.use("/api/categorias", CategoriaRoutes.routes);
    router.use("/api/perfiles", PerfilRoutes.routes);

    return router;
  }
}
