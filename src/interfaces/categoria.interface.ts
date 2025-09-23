export interface Categoria {
    id_categoria: number;
    nombre_categoria: string;
    descripcion: string;
}

export interface CrearCategoriaDTO {
    nombre_categoria: string;
    descripcion: string;
}

export interface ActualizarCategoriaDTO {
    nombre_categoria: string;
    descripcion: string;
}