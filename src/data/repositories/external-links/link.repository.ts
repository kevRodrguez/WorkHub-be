import { pool } from "../../../config/db";
import {
  Link,
  UpdateLinkDTO,
} from "../../../interfaces/externalLink.interface";

export const LinkRepository = {
  async getLinks(): Promise<Link[]> {
    const result = await pool.query(
      "SELECT * FROM external_links ORDER BY created_at DESC"
    );

    return result.rows as Link[];
  },

  async getLinkById(id_link: number): Promise<Link | null> {
    const result = await pool.query(
      "SELECT * FROM external_links WHERE id = $1",
      [id_link]
    );
    return result.rows[0] || null;
  },

  async getLinkByUrl(url: string): Promise<Link | null> {
    const result = await pool.query(
      "SELECT * FROM external_links WHERE url = $1",
      [url]
    );
    return result.rows[0] || null;
  },

  async createLink(
    url: string,
    id_perfil: number,
    titulo: string | null,
    descripcion: string | null,
    imagen: string | null,
    favicon: string | null
  ): Promise<Link> {
    const result = await pool.query(
      `INSERT INTO external_links (url, id_perfil, titulo, descripcion, link_imagen, favicon, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [url, id_perfil, titulo, descripcion, imagen, favicon]
    );
    return result.rows[0];
  },

  async updateLink(
    id_link: number,
    data: Partial<UpdateLinkDTO>
  ): Promise<Link | null> {
    const result = await pool.query(
      `UPDATE external_links
     SET titulo = $2, descripcion = $3, link_imagen = $4, favicon = $5, updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
      [id_link, data.titulo, data.descripcion, data.imagen, data.favicon]
    );
    return result.rows[0] || null;
  },

  async deleteLink(id_link: number): Promise<void> {
    await pool.query("DELETE FROM external_links WHERE id = $1", [id_link]);
  },
};
