import { ValidationChain, body, param } from "express-validator";

export const getEmpresasValidator: ValidationChain[] = [
  param("id_empresa")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id de la empresa es obligatorio y debe ser numérico"),
];

export const seguirDejarDeSeguirEmpresaValidator: ValidationChain[] = [
  body("id_seguidor")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del seguidor es obligatorio y debe ser numérico"),
  body("id_seguido")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del seguido es obligatorio y debe ser numérico"),
];

