import { Request, Response, NextFunction } from "express";
import { createClient, User } from "@supabase/supabase-js";
import { envs } from "../config/envs";

const supabase = createClient(envs.SUPABASE_URL, envs.SUPABASE_ANON_KEY);

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "No se proporcionó token de autenticación",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Formato de token inválido",
        });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Token inválido o expirado",
                error: error?.message,
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al verificar la autenticación",
            error: (error as Error).message,
        });
    }
};
