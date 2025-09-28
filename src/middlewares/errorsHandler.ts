import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/CustomError';

export const errorHandler = (
    err: (Error & { statusCode?: number }) | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(err);

    // Si es CustomError, usa su statusCode y message
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: "Error",
            message: err.message
        });
        return;
    }

    // Si no, responde con 500
    res.status(500).json({
        status: "Error",
        message: err.message || "Error interno del servidor"
    });

};
