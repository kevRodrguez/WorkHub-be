import { Router } from "express";
import { CurriculumsCandidateController } from "./curriculums.controller";

export class CurriculumsCandidateRoutes {
  static get routes(): Router {
    const router = Router();

    // GET /api/candidate/curriculums/perfil/:idPerfil - Obtener CVs por perfil
    router.get(
      "/perfil/:idPerfil",
      CurriculumsCandidateController.getCurriculumsByPerfilId
    );

    // POST /api/candidate/curriculums - Crear nuevo CV
    router.post(
      "/",
      CurriculumsCandidateController.insertarCurriculum
    );

    // PATCH /api/candidate/curriculums/:idCurriculum - Actualizar nombre del CV
    router.patch(
      "/:idCurriculum",
      CurriculumsCandidateController.actualizarNombreCurriculum
    );

    // DELETE /api/candidate/curriculums/:idCurriculum - Eliminar CV
    router.delete(
      "/:idCurriculum",
      CurriculumsCandidateController.eliminarCurriculum
    );

    return router;
  }
}
