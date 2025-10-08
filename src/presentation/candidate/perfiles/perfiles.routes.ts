import { Router } from "express";
import { PerfilesCandidateController } from "./perfiles.controller";
import { ExpressValidators } from "../../../utils/express-validators";
import { handleValidationErrors } from "../../../utils/validation-error.middleware";

export class PerfilCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    // Rutas para Ajustes del candidato

    router.get("/", PerfilesCandidateController.getPerfiles);

    router.get(
      "/:id",
      handleValidationErrors,
      PerfilesCandidateController.getPerfilById
    );

    router.post(
      "/",
      ExpressValidators.crearPerfilCandidato(),
      handleValidationErrors,
      PerfilesCandidateController.insertarPerfil
    );

    router.put(
      "/:id",
      ExpressValidators.actualizarPerfilCandidato(),
      handleValidationErrors,
      PerfilesCandidateController.actualizarPerfil
    );

    router.delete(
      "/:id",
      handleValidationErrors,
      PerfilesCandidateController.eliminarPerfil
    );

    // Rutas para Seccion General del perfil
    router.get("/general/:id", PerfilesCandidateController.getTopTrabajosAplicados);
    router.get("/stats/:id", PerfilesCandidateController.getProfileStats);


    // Rutas para Trabajos Aplicados
    router.get("/trabajos-aplicados/:id", PerfilesCandidateController.getTrabajosAplicados);
    router.get("/trabajos-favoritos/:id", PerfilesCandidateController.getTrabajosFavoritos);
    router.get("/notificaciones/:id", PerfilesCandidateController.getAlertasTrabajos);

    // Ruta para actualizar el estado de las notificaciones
    router.put(
      "/notificaciones/:id",
      handleValidationErrors,
      PerfilesCandidateController.actualizarEstadoNotificacion
    );

    // Ruta para eliminar favoritos
    router.delete(
      "/favoritos/:id",
      handleValidationErrors,
      PerfilesCandidateController.eliminarFavorito
    );

    return router;
  }
}
