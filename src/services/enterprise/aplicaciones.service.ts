import { UUID } from "crypto";
import { PerfilesEnterpriseRepository } from "../../data/repositories/enterprise/perfiles.repository";
import { CrearPerfilEmpresaDTO, ActualizarPerfilEmpresaDTO, PerfilEmpresa } from "../../interfaces/perfil.enterprise.interface";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";
import { AplicacionesEnterpriseRepository } from "../../data/repositories/enterprise/aplicaciones.repository";

export const AplicacionesEnterpriseService = {

    async getAplicacionesByIdTrabajo(id_trabajo: number): Promise<any[]> {
        const aplicaciones = await AplicacionesEnterpriseRepository.getAplicacionesByIdTrabajo(id_trabajo);
        return aplicaciones;
    },

};