import { Request, Response } from "express";
import { LinkService } from "../../services/externalLink/link.service";
import { ValidationError, NotFoundError, BusinessRuleError } from "../../utils/errors";

export const LinkController = {
  async getLinks(req: Request, res: Response) {
    try {
      const links = await LinkService.getLinks();
      res.json({
        success: true,
        data: links,
        message: "Links obtenidos con éxito",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        error: (error as Error).message,
      });
    }
  },

  async crearLink(req: Request, res: Response) {
    try {
      const { url, id_perfil } = req.body;

      if (!url || !id_perfil) {
        throw new ValidationError("Campos requeridos faltantes", !url ? "url" : "id_perfil");
      }

      const link = await LinkService.createLink(url, id_perfil);

      res.json({
        success: true,
        data: link,
        message: "Link creado y metadata extraída correctamente",
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          success: false,
          message: error.message,
          field: error.field,
        });
      } else if (error instanceof BusinessRuleError) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error al crear link",
          error: (error as Error).message,
        });
      }
    }
  },

  async eliminarLink(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      await LinkService.deleteLink(id);
      res.json({
        success: true,
        message: "Link eliminado con éxito",
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: (error as Error).message,
        });
      }
    }
  },
};
