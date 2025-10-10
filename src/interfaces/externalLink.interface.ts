export interface Link {
  id_link?: number;
  url: string;
  titulo?: string;
  descripcion?: string;
  imagen?: string;
  sitio?: string;
  favicon?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date | null;
  id_perfil?: number;
}

export interface UpdateLinkDTO {
  id_link?: number;
  url: string;
  titulo?: string;
  descripcion?: string;
  imagen?: string;
  sitio?: string;
  favicon?: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date | null;
}

export interface CrearLinkDTO {
  url: string;
    id_perfil: number;
}

export interface ActualizarLinkDTO {
  titulo?: string;
  descripcion?: string;
  imagen?: string;
  sitio?: string;
  favicon?: string;
  id_perfil: number;
}
