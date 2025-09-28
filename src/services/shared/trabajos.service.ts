import { UUID } from "crypto";
import { PerfilesEnterpriseRepository } from "../../data/repositories/enterprise/perfiles.repository";
import { CrearPerfilEmpresaDTO, ActualizarPerfilEmpresaDTO, PerfilEmpresa } from "../../interfaces/perfil.enterprise.interface";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";
import { get } from "http";
import { TrabajosRepository } from "../../data/repositories/shared/trabajos.repository";

export const TrabajosService = {

    async getTrabajosByPerfilId(perfil_id: number) {
        const trabajos = await TrabajosRepository.getTrabajosByPerfilId(perfil_id);
        return trabajos;
    }

};