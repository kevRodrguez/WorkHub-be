import { Router } from "express";
import { BlogRoutes } from "./blog/blog.routes";
import { ComentarioRoutes } from "./blog/comentario.routes";
import { LinkRoutes } from "../externalLinks/link.routes";

export class ResourcesRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/blogs", BlogRoutes.routes);
    router.use("/comentarios", ComentarioRoutes.routes);

    router.use("/links", LinkRoutes.routes);

    
    return router;
  }
}
