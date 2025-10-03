import { CurriculumsRepository } from "../../data/repositories/candidate/curriculums.repository";
import { CrearCurriculumDTO, Curriculum } from "../../interfaces";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";

export const CurriculumsService = {
  async getCurriculums(): Promise<Curriculum[]> {
    const curriculums = await CurriculumsRepository.getCurriculums();

    if (!curriculums || curriculums.length === 0) {
      throw new NotFoundError("No se encontraron currículums");
    }

    return curriculums;
  },

  async getCurriculumsByPerfilId(id_perfil: number): Promise<Curriculum[]> {
    if (!id_perfil || id_perfil <= 0) {
      throw new BusinessRuleError("El ID del perfil no es válido");
    }

    const curriculums =
      await CurriculumsRepository.getCurriculumsByPerfilId(id_perfil);

    return curriculums;
  },

  async getCurriculumById(id: number): Promise<Curriculum> {
    const curriculum = await CurriculumsRepository.getCurriculumById(id);
    if (!curriculum) {
      throw new NotFoundError(`CV no encontrado`);
    }
    return curriculum;
  },

  async insertarCurriculum(datos: CrearCurriculumDTO): Promise<Curriculum> {
    const { id_perfil, url_curriculum, nombre_archivo, tamano_archivo } =
      datos;

    if (!id_perfil || !url_curriculum || !nombre_archivo || !tamano_archivo) {
      throw new BusinessRuleError("Faltan datos requeridos");
    }

    if (tamano_archivo <= 0) {
      throw new BusinessRuleError("El tamaño del archivo no es válido");
    }

    const totalCVs =
      await CurriculumsRepository.countCurriculumsByPerfilId(id_perfil);

    if (totalCVs >= 3) {
      throw new BusinessRuleError(
        "Has alcanzado el límite máximo de 3 CVs. Por favor, elimina uno antes de subir otro."
      );
    }

    const curriculum = await CurriculumsRepository.insertarCurriculum(datos);

    return curriculum;
  },

  async actualizarNombreCurriculum(
    id_curriculum: number,
    nombre_archivo: string
  ): Promise<Curriculum> {
    if (!nombre_archivo || nombre_archivo.trim().length === 0) {
      throw new BusinessRuleError("El nombre del archivo no puede estar vacío");
    }

    if (nombre_archivo.length > 255) {
      throw new BusinessRuleError(
        "El nombre del archivo no puede exceder los 255 caracteres"
      );
    }

    await this.getCurriculumById(id_curriculum);

    const curriculumActualizado =
      await CurriculumsRepository.actualizarNombreCurriculum(
        id_curriculum,
        nombre_archivo
      );

    if (!curriculumActualizado) {
      throw new NotFoundError("Error al actualizar el nombre del CV");
    }

    return curriculumActualizado;
  },

  async eliminarCurriculum(id_curriculum: number): Promise<void> {
    await this.getCurriculumById(id_curriculum);

    const curriculum =
      await CurriculumsRepository.eliminarCurriculum(id_curriculum);

    if (!curriculum) {
      throw new NotFoundError("Error al eliminar el CV");
    }
  },
};
