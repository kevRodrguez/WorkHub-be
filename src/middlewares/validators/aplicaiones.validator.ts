import { ValidationChain, body, param } from "express-validator";



export const getAplicacionesByTrabajoIdValidator: ValidationChain[] = [
    param('id_trabajo').trim().notEmpty().isNumeric().withMessage('El id del trabajo es obligatorio y debe ser numérico'),
]