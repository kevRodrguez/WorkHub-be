import { Router } from "express";
import { BlogRoutes } from "./blog/blog.routes";
import { ComentarioRoutes } from "./blog/comentario.routes";

export class ResourcesRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/blogs", BlogRoutes.routes);
    router.use("/comentarios", ComentarioRoutes.routes);
    return router;
  }
}
