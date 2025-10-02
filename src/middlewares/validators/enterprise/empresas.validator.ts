import { ValidationChain, body, param } from "express-validator";

export const getEmpresasValidator: ValidationChain[] = [
  param("id_empresa")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id de la empresa es obligatorio y debe ser numérico"),
]