import { Request, Response } from "express";
import { EnterprisesService } from "../../../services/candidate/enterprises.service";

export const EnterprisesController = {
  async getEnterprises(req: Request, res: Response) {
    try {
      const enterprises = await EnterprisesService.getEnterprises();

      res.status(200).json(enterprises);
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
