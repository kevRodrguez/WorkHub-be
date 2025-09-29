/*
Tabla trabajos en la database
id_trabajo (PK)
id_perfil (FK) (empresa)
id_categoria (FK)
nombre_trabajo
descripcion
requisitos
salario_minimo
salario_maximo
modalidad (presencial, remoto, híbrido)
educacion
experiencia
fecha_expiracion
ubicacion
*/

import { ValidationChain, body, param } from "express-validator";

export const getTrabajoByIdValidator: ValidationChain[] = [
  param("id_perfil")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("El id del perfil es obligatorio y debe ser numérico"),
];
