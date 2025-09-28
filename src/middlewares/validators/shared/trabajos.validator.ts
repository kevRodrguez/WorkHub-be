import { ValidationChain, body, param } from "express-validator";

export const getTrabajoByIdValidator: ValidationChain[] = [
    param('perfil_id').trim().notEmpty().isNumeric().withMessage('El id del perfil es obligatorio y debe ser numérico'),
]