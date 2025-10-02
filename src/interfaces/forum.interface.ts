import { inflateRaw } from "zlib";

export interface Foro {
  id_foro: number;
  id_categoria: number;
  id_perfil: number;
  titulo: string;
  contenido: string;
  fecha: Date;
}

export interface CrearForoDTO {
  id_categoria: number;
  id_perfil: number;
  titulo: string;
  contenido: string;
  fecha: Date;
}

export interface ActtualizarForoDTO {
  id_categoria: number;
  id_perfil: number;
  titulo: string;
  contenido: string;
  fecha: Date;
}
