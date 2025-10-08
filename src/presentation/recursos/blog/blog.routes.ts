import { Router } from "express";
import { BlogController } from "./blog.controller";

export class BlogRoutes {
  static get routes() {
    const router = Router();

    router.get("/", BlogController.getBlogs);
    router.post("/", BlogController.crearBlog);
    router.put("/:id", BlogController.actualizarBlog);
    router.delete("/:id", BlogController.eliminarBlog);

    return router;
  }
}