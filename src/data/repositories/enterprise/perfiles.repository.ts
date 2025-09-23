import { pool } from "../../../config/db";
import { PerfilEmpresa } from "../../../interfaces/perfil.enterprise.interface";

export const PerfilesEnterpriseRepository = {
    async CrearPerfil(
        id_usuario: number,
        nombre?: string,
        biografia?: string,
        telefono?: string,
        link_foto_perfil?: string,
        fecha_nacimiento_fundacion?: Date,
        ubicacion?: string,
        pagina_web?: string,
        red_social?: string,
        email?: string
    ): Promise<PerfilEmpresa> {
        const result = await pool.query(
            `INSERT INTO perfiles 
          (id_usuario, nombre, biografia, telefono, link_foto_perfil, fecha_nacimiento_fundacion, ubicacion, pagina_web, red_social, email)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                id_usuario,
                nombre,
                biografia,
                telefono,
                link_foto_perfil,
                fecha_nacimiento_fundacion,
                ubicacion,
                pagina_web,
                red_social,
                email,
            ]
        );

        return result.rows[0];
    },

    async getPerfiles(): Promise<PerfilEmpresa[]> {
        const result = await pool.query(
            "SELECT * FROM perfiles WHERE email IS NOT NULL ORDER BY id_perfil"
        );
        return result.rows;
    },

    async getPerfilById(id: number): Promise<PerfilEmpresa | null> {
        const result = await pool.query(
            "SELECT * FROM perfiles WHERE id_perfil = $1",
            [id]
        );
        return result.rows[0] || null;
    },

    async actualizarPerfil(
        id_perfil: number,
        nombre?: string,
        biografia?: string,
        telefono?: string,
        link_foto_perfil?: string,
        fecha_nacimiento_fundacion?: Date,
        genero?: string,
        estado_civil?: string,
        ubicacion?: string,
        pagina_web?: string,
        red_social?: string,
        email?: string
    ): Promise<PerfilEmpresa | null> {
        const result = await pool.query(
            `UPDATE perfiles SET 
          nombre = $1, biografia = $2, telefono = $3, link_foto_perfil = $4, 
          fecha_nacimiento_fundacion = $5, genero = $6, estado_civil = $7, 
          ubicacion = $8, pagina_web = $9, red_social = $10, email = $11
          WHERE id_perfil = $12 RETURNING *`,
            [
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
                email,
                id_perfil,
            ]
        );
        return result.rows[0] || null;
    },

    async eliminarPerfil(id_perfil: number): Promise<PerfilEmpresa | null> {
        const result = await pool.query(
            "DELETE FROM perfiles WHERE id_perfil = $1 RETURNING *",
            [id_perfil]
        );
        return result.rows[0] || null;
    },
}