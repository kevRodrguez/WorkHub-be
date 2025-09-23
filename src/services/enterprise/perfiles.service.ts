import { PerfilesEnterpriseRepository } from "../../data/repositories/enterprise/perfiles.repository";
import { CrearPerfilEmpresaDTO, ActualizarPerfilEmpresaDTO, PerfilEmpresa } from "../../interfaces/perfil.enterprise.interface";
import {NotFoundError, BusinessRuleError } from "../../utils/errors";

export const PerfilesEnterpriseService = {
    async createPerfil(data: CrearPerfilEmpresaDTO): Promise<PerfilEmpresa> {

        await this.validarUsuarioUnico(data.id_usuario);

        // Sanitizar datos opcionales
        const datosSanitizados = this.sanitizarDatos(data);

        const result = await PerfilesEnterpriseRepository.CrearPerfil(
            datosSanitizados.id_usuario,
            datosSanitizados.nombre,
            datosSanitizados.biografia,
            datosSanitizados.telefono,
            datosSanitizados.link_foto_perfil,
            datosSanitizados.fecha_nacimiento_fundacion,
            datosSanitizados.ubicacion,
            datosSanitizados.pagina_web,
            datosSanitizados.red_social,
            datosSanitizados.email
        );

        // Transformar y limpiar la respuesta
        return this.limpiarRespuesta(result);
    },

    async getPerfiles(): Promise<PerfilEmpresa[]> {
        const perfiles = await PerfilesEnterpriseRepository.getPerfiles();

        // Transformar cada perfil
        return perfiles.map(perfil => this.limpiarRespuesta(perfil));
    },

    async getPerfilById(id: number): Promise<PerfilEmpresa> {
        const perfil = await PerfilesEnterpriseRepository.getPerfilById(id);

        if (!perfil) {
            throw new NotFoundError(`Perfil de empresa con ID ${id} no encontrado`);
        }

        // Limpiar y retornar
        return this.limpiarRespuesta(perfil);
    },

    async actualizarPerfil(
        id_perfil: number,
        datos: ActualizarPerfilEmpresaDTO
    ): Promise<PerfilEmpresa> {
        
        // Verificar que el perfil existe
        await this.getPerfilById(id_perfil);

        // Sanitizar datos
        const datosSanitizados = this.sanitizarDatosActualizacion(datos);

        const perfilActualizado = await PerfilesEnterpriseRepository.actualizarPerfil(
            id_perfil,
            datosSanitizados.nombre,
            datosSanitizados.biografia,
            datosSanitizados.telefono,
            datosSanitizados.link_foto_perfil,
            datosSanitizados.fecha_nacimiento_fundacion,
            datosSanitizados.ubicacion,
            datosSanitizados.pagina_web,
            datosSanitizados.red_social,
            datosSanitizados.email
        );

        if (!perfilActualizado) {
            throw new NotFoundError(`No se pudo actualizar el perfil con ID ${id_perfil}`);
        }

        // Limpiar y retornar
        return this.limpiarRespuesta(perfilActualizado);
    },

    async eliminarPerfil(id_perfil: number): Promise<PerfilEmpresa> {

        // Verificar que el perfil existe
        await this.getPerfilById(id_perfil);

        const perfilEliminado = await PerfilesEnterpriseRepository.eliminarPerfil(id_perfil);

        if (!perfilEliminado) {
            throw new NotFoundError(`No se pudo eliminar el perfil con ID ${id_perfil}`);
        }

        // Limpiar y retornar
        return this.limpiarRespuesta(perfilEliminado);
    },

    // Método para limpiar y transformar respuesta (sin campos irrelevantes)
    limpiarRespuesta(perfil: any): PerfilEmpresa {
        return {
            id_perfil: perfil.id_perfil,
            id_usuario: perfil.id_usuario,
            nombre: perfil.nombre?.trim() || undefined,
            biografia: perfil.biografia?.trim() || undefined,
            telefono: perfil.telefono?.trim() || undefined,
            link_foto_perfil: perfil.link_foto_perfil || undefined,
            fecha_nacimiento_fundacion: perfil.fecha_nacimiento_fundacion || undefined,
            ubicacion: perfil.ubicacion?.trim() || undefined,
            pagina_web: perfil.pagina_web || undefined,
            red_social: perfil.red_social || undefined,
            email: perfil.email?.toLowerCase() || undefined
            // Campos excluidos automáticamente: genero, estado_civil
        };
    },

    // Validaciones de negocio (no cubiertas por express-validator)
    async validarUsuarioUnico(id_usuario: number): Promise<void> {
        const perfiles = await PerfilesEnterpriseRepository.getPerfiles();
        
        const usuarioExiste = perfiles.some(perfil => perfil.id_usuario === id_usuario);

        if (usuarioExiste) {
            throw new BusinessRuleError(`Ya existe un perfil de empresa para el usuario con ID ${id_usuario}`);
        }
    },

    // Sanitización adicional
    sanitizarDatos(datos: CrearPerfilEmpresaDTO): CrearPerfilEmpresaDTO {
        return {
            id_usuario: datos.id_usuario,
            nombre: datos.nombre || undefined,
            biografia: datos.biografia || undefined,
            telefono: datos.telefono || undefined,
            ubicacion: datos.ubicacion || undefined,
            pagina_web: datos.pagina_web || undefined,
            red_social: datos.red_social || undefined,
            link_foto_perfil: datos.link_foto_perfil || undefined,
            email: datos.email || undefined,
            fecha_nacimiento_fundacion: datos.fecha_nacimiento_fundacion || undefined
        };
    },

    sanitizarDatosActualizacion(datos: ActualizarPerfilEmpresaDTO): ActualizarPerfilEmpresaDTO {
        return {
            nombre: datos.nombre || undefined,
            biografia: datos.biografia || undefined,
            telefono: datos.telefono || undefined,
            ubicacion: datos.ubicacion || undefined,
            pagina_web: datos.pagina_web || undefined,
            red_social: datos.red_social || undefined,
            link_foto_perfil: datos.link_foto_perfil || undefined,
            email: datos.email || undefined,
            fecha_nacimiento_fundacion: datos.fecha_nacimiento_fundacion || undefined
        };
    }
};