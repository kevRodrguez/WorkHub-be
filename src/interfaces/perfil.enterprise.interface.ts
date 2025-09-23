// se utiliza como la promesa de la respuesta de la base de datos
export interface PerfilEmpresa {
    id_perfil: number;
    id_usuario: number;
    nombre?: string;
    biografia?: string;
    telefono?: string;
    link_foto_perfil?: string;
    fecha_nacimiento_fundacion?: Date;
    ubicacion?: string;
    pagina_web?: string;
    red_social?: string;
    email?: string;
}

// para datos de entrada (creación y actualización)
export interface CrearPerfilEmpresaDTO {
    id_usuario: number;
    nombre?: string;
    biografia?: string;
    telefono?: string;
    link_foto_perfil?: string;
    fecha_nacimiento_fundacion?: Date;
    ubicacion?: string;
    pagina_web?: string;
    red_social?: string;
    email?: string;
}

//  para datos de actualización (todos opcionales, solo campos relevantes para empresas)
export interface ActualizarPerfilEmpresaDTO {
    nombre?: string;
    biografia?: string;
    telefono?: string;
    link_foto_perfil?: string;
    fecha_nacimiento_fundacion?: Date;
    ubicacion?: string;
    pagina_web?: string;
    red_social?: string;
    email?: string;
}

// Interfaces de usuario de autenticación (mantener las existentes si se usan)
export interface User {
    id: string;
    aud: string;
    role: string;
    email: string;
    phone: string;
    confirmation_sent_at: Date;
    app_metadata: AppMetadata;
    user_metadata: Data;
    identities: Identity[];
    created_at: Date;
    updated_at: Date;
    is_anonymous: boolean;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

export interface Identity {
    identity_id: string;
    id: string;
    user_id: string;
    identity_data: Data;
    provider: string;
    last_sign_in_at: Date;
    created_at: Date;
    updated_at: Date;
    email: string;
}

export interface Data {
    email: string;
    email_verified: boolean;
    full_name: string;
    phone_verified: boolean;
    sub: string;
    user_type: string;
    username: string;
}

