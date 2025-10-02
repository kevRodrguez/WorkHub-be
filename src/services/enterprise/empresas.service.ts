import { AplicacionesEnterpriseRepository } from "../../data/repositories/enterprise/aplicaciones.repository";
import { EmpresasRepository } from "../../data/repositories/enterprise/empresas.repository";

export const EmpresasEnterpriseService = {
  async getEmpresas(id_empresa: number) {
    return await EmpresasRepository.getEmpresas(id_empresa);
  }
};
