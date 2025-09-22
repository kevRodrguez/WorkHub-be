import { Router } from "express";
import { CategoriaRoutes } from "../presentation/routes/categoria.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );
    router.use("/api/categorias", CategoriaRoutes.routes);

    return router;
  }
}
