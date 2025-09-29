import { UUID } from "crypto";
import { TrabajosRepository } from "../../data/repositories/enterprise/trabajos.repository";
import {
  CrearTrabajoDTO,
  ActualizarTrabajoDTO,
  Trabajo,
} from "../../interfaces/trabajos.interface";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";

export const TrabajosService = {
  async insertarTrabajo(data: CrearTrabajoDTO): Promise<CrearTrabajoDTO> {
    // Las validaciones básicas las maneja express-validator
    // Solo validaciones de negocio específicas aquí

    await this.validarSalario(data.salario_minimo, data.salario_maximo);
    await this.validarFechaExpiracion(data.fecha_expiracion);

    return await TrabajosRepository.insertarTrabajo(data);
  },

  async actualizarTrabajo(
    id_trabajo: number,
    data: ActualizarTrabajoDTO
  ): Promise<ActualizarTrabajoDTO> {
    // Las validaciones básicas las maneja express-validator
    // Solo validaciones de negocio específicas aquí

    await this.validarSalario(data.salario_minimo, data.salario_maximo);
    await this.validarFechaExpiracion(data.fecha_expiracion);

    return await TrabajosRepository.actualizarTrabajo(id_trabajo, data);
  },

  async eliminarTrabajo(id_trabajo: number): Promise<void> {
    await TrabajosRepository.eliminarTrabajo(id_trabajo);
  },

  // Validaciones de negocio
  async validarSalario(
    salario_minimo: number,
    salario_maximo: number
  ): Promise<void> {
    if (salario_minimo > salario_maximo) {
      throw new BusinessRuleError(
        "El salario mínimo no puede ser mayor que el salario máximo"
      );
    }
  },

  async validarFechaExpiracion(fecha_expiracion: Date): Promise<void> {
    if (fecha_expiracion < new Date()) {
      throw new BusinessRuleError(
        "La fecha de expiración no puede ser anterior a la fecha actual"
      );
    }
  },
};
