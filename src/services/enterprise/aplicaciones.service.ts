import { AplicacionesEnterpriseRepository } from "../../data/repositories/enterprise/aplicaciones.repository";

export const AplicacionesEnterpriseService = {
  async getAplicacionesByIdTrabajo(id_aplicacion: number): Promise<any[]> {
    const aplicaciones =
      await AplicacionesEnterpriseRepository.getAplicacionesByIdTrabajo(
        id_aplicacion
      );
    return aplicaciones;
  },

  async getAplicacionesByIdEmpresa(id_empresa: number): Promise<any[]> {
    const aplicaciones =
      await AplicacionesEnterpriseRepository.getAplicacionesByIdEmpresa(
        id_empresa
      );
    return aplicaciones;
  },
  async updateEstadoAplicacion(
    id_trabajo: number,
    nuevo_estado: string
  ): Promise<any[]> {
    const aplicaciones =
      await AplicacionesEnterpriseRepository.updateEstadoAplicacion(
        id_trabajo,
        nuevo_estado
      );
    return aplicaciones;
  },
};
