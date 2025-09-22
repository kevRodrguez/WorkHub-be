import { Request, Response } from "express";
import { PerfilesService } from "../../services/perfiles.service";

export const PerfilesController = {
  async getPerfiles(req: Request, res: Response) {
    try {
      const perfiles = await PerfilesService.getPerfiles();
      res.json(perfiles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async getPerfilById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const perfil = await PerfilesService.getPerfilById(id);
      if (perfil) {
        res.json(perfil);
      } else {
        res.status(404).json({ message: "Perfil no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async insertarPerfil(req: Request, res: Response) {
    try {
      const {
        id_usuario,
        nombre,
        biografia,
        telefono,
        link_foto_perfil,
        fecha_nacimiento_fundacion,
        genero,
        estado_civil,
        ubicacion,
        pagina_web,
        red_social,
      } = req.body;

      const nuevoPerfil = await PerfilesService.insertarPerfil(
        id_usuario,
        nombre,
        biografia,
        telefono,
        link_foto_perfil,
        fecha_nacimiento_fundacion,
        genero,
        estado_civil,
        ubicacion,
        pagina_web,
        red_social
      );

      res.status(201).json(nuevoPerfil);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },

  async actualizarPerfil(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const {
        nombre,
        biografia,
        telefono,
        link_foto_perfil,
        fecha_nacimiento_fundacion,
        genero,
        estado_civil,
        ubicacion,
        pagina_web,
        red_social,
      } = req.body;

      const perfilActualizado = await PerfilesService.actualizarPerfil(
        id,
        nombre,
        biografia,
        telefono,
        link_foto_perfil,
        fecha_nacimiento_fundacion,
        genero,
        estado_civil,
        ubicacion,
        pagina_web,
        red_social
      );

      if (perfilActualizado) {
        res.json("Perfil actualizado con éxito");
      } else {
        res.status(404).json({ message: "Perfil no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  },
};
