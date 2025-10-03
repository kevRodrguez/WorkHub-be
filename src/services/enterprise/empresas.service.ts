import { AplicacionesEnterpriseRepository } from "../../data/repositories/enterprise/aplicaciones.repository";
import { EmpresasRepository } from "../../data/repositories/enterprise/empresas.repository";

export const EmpresasEnterpriseService = {
  async getEmpresas(id_empresa: number) {
    return await EmpresasRepository.getEmpresas(id_empresa);
  },

  async seguirEmpresa(id_empresa_seguidora: number, id_empresa_seguida: number) {
    return await EmpresasRepository.seguirEmpresa(id_empresa_seguidora, id_empresa_seguida);
  },

  async dejarDeSeguirEmpresa(id_empresa_seguidora: number, id_empresa_seguida: number) {
    return await EmpresasRepository.dejarDeSeguirEmpresa(id_empresa_seguidora, id_empresa_seguida);
  }
};
