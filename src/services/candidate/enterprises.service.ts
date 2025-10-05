import { EnterpriseRepository } from "../../data/repositories/candidate/enterprise.repository";
import { NotFoundError, BusinessRuleError } from "../../utils/errors";

export const EnterprisesService = {
  async getEnterprises(): Promise<any[]> {
    const enterprises = await EnterpriseRepository.getEnterprises();

    // Aplicar transformaciones si es necesario
    return enterprises.map((enterprise) => ({
      ...enterprise,
      name: enterprise.name,
      description: enterprise.description,
    }));
  },
};
