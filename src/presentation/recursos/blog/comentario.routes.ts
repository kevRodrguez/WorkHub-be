import { Router } from "express";
import { ComentarioController } from "./comentario.controller";

export class ComentarioRoutes {
  static get routes() {
    const router = Router();

    router.get("/", ComentarioController.getComentarios);
    router.get("/blog/:id", ComentarioController.getComentariosByBlogId);
    router.post("/", ComentarioController.crearComentario);
    router.delete("/:id", ComentarioController.eliminarComentario);
    router.put("/:id", ComentarioController.actualizarComentario);

    return router;
  }
}