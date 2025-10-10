import { ValidationChain, body, param } from "express-validator";

export const getAplicacionesByTrabajoIdValidator: ValidationChain[] = [
  param("id_trabajo")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del trabajo es obligatorio y debe ser numérico"),
];


export const getAplicacionesByIdEmpresaValidator: ValidationChain[] = [
  param("id_empresa")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id de la empresa es obligatorio y debe ser numérico"),
];

export const updateEstadoAplicacionValidator: ValidationChain[] = [
  param("id_aplicacion")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id de la aplicación es obligatorio y debe ser numérico"),
  body("nuevo_estado")
    .trim()
    .notEmpty()
    .isIn(["pendiente", "aceptado", "rechazado"])
    .withMessage(
      "El nuevo estado es obligatorio y debe ser uno de los siguientes: pendiente, aceptado, rechazado"
    ),
];

export const eliminarTrabajoValidator: ValidationChain[] = [
  param("id_trabajo")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del trabajo es obligatorio y debe ser numérico"),
];

export const createAplicacionValidator: ValidationChain[] = [
  body("id_trabajo")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del trabajo es obligatorio y debe ser numérico"),
  body("id_candidato")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del candidato es obligatorio y debe ser numérico"),
  body("id_curriculum")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del curriculum es obligatorio y debe ser numérico"),
  body("mensaje")
    .trim()
    .notEmpty()
    .withMessage("El mensaje es obligatorio"),
  body("estado")
    .optional()
    .trim()
    .isIn(["pendiente", "aceptado", "rechazado"])
    .withMessage(
      "El estado debe ser uno de los siguientes: pendiente, aceptado, rechazado"
    ),
];
