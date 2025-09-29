import exp from "constants";
import { CurriculumsRepository } from "../../data/repositories/candidate/curriculums.repository";
import { ActualizarCurriculumDTO, Curriculum } from "../../interfaces";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";
import { Validators } from "../../utils/validators";

export const CurriculumsService = {
  async getCurriculums(): Promise<Curriculum[]> {
    const curriculums = await CurriculumsRepository.getCurriculums();

    if (!curriculums || curriculums.length === 0) {
      throw new NotFoundError("No se encontraron currículums");
    }

    return curriculums;
  },

  async getCurriculumById(id: number): Promise<Curriculum> {
    // express-validator ya validó que id sea positivo
    const curriculum = await CurriculumsRepository.getCurriculumById(id);
    if (!curriculum) {
      throw new NotFoundError(`Currículum con ID ${id} no encontrado`);
    }
    return curriculum;
  },

  async insertarCurriculum(datos: Partial<Curriculum>): Promise<Curriculum> {
    // Validar los datos antes de insertar
    const { id_perfil, url_curriculum } = datos;
    if (!id_perfil || !url_curriculum) {
      throw new BusinessRuleError("Faltan datos requeridos");
    }

    // Insertar el currículum
    const curriculum = await CurriculumsRepository.insertarCurriculum(
      id_perfil,
      url_curriculum
    );

    return curriculum;
  },

  async actualizarCurriculum(
    id_curriculum: number,
    datos: ActualizarCurriculumDTO
  ): Promise<Curriculum> {
    // express-validator ya validó que id_curriculum sea positivo y los datos básicos

    // Verificar que el currículum existe
    await this.getCurriculumById(id_curriculum);

    // Sanitizar datos
    const datosSanitizados = {
      url_curriculum: datos.url_curriculum,
    };

    const curriculumActualizado =
      await CurriculumsRepository.actualizarCurriculum(
        id_curriculum,
        datosSanitizados.url_curriculum
      );

    if (!curriculumActualizado) {
      throw new NotFoundError(
        `No se pudo actualizar el currículum con ID ${id_curriculum}`
      );
    }

    return curriculumActualizado;
  },

  async eliminarCurriculum(id_curriculum: number): Promise<Curriculum> {
    // express-validator ya validó que id_curriculum sea positivo
    await this.getCurriculumById(id_curriculum);

    const curriculum = await CurriculumsRepository.eliminarCurriculum(
      id_curriculum
    );

    if (!curriculum) {
      throw new NotFoundError(
        `No se pudo eliminar el currículum con ID ${id_curriculum}`
      );
    }

    return curriculum;
  },
};
