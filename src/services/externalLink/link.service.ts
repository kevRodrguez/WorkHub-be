import { LinkRepository } from "../../data/repositories/external-links/link.repository";
import { Link } from "../../interfaces/externalLink.interface";
import fetch from "node-fetch";
import metascraper from "metascraper";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";

const scraper = metascraper([
  metascraperTitle(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
]);

export const LinkService = {
  async getLinks(): Promise<Link[]> {
    return await LinkRepository.getLinks();
  },

  async getLinkById(id_link: number): Promise<Link | null> {
    return await LinkRepository.getLinkById(id_link);
  },

  async createLink(url: string, id_perfil: number): Promise<Link> {
    const existing = await LinkRepository.getLinkByUrl(url);
    if (existing) return existing;

    // Obtenemos el HTML de la página
    const response = await fetch(url, {
      headers: { "User-Agent": "MetadataBot/1.0" },
    });
    const html = await response.text();

    // Extraemos metadata
    const metadata = await scraper({ html, url });

    const titulo = metadata.title || null;
    const descripcion = metadata.description || null;
    const imagen = metadata.image || null;
    const favicon = metadata.logo || null;

    const link = await LinkRepository.createLink(
      url,
      id_perfil,
      titulo,
      descripcion,
      imagen,
      favicon
    );

    return link;
  },

  async updateLink(id_link: number, data: Partial<Link>): Promise<Link | null> {
    return await LinkRepository.updateLink(id_link, data);
  },

  async deleteLink(id_link: number): Promise<void> {
    await LinkRepository.deleteLink(id_link);
  },
};
