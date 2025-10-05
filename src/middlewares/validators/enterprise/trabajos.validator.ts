import { ValidationChain, body, param } from "express-validator";

export const insertarTrabajoValidator: ValidationChain[] = [
  body("id_perfil")
    .trim()
    .notEmpty()
    .withMessage("El id del perfil es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id del perfil debe ser numérico y positivo"),
  body("id_categoria")
    .trim()
    .notEmpty()
    .withMessage("El id de la categoría es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id de la categoría debe ser numérico y positivo"),
  body("nombre_trabajo")
    .trim()
    .notEmpty()
    .withMessage("El nombre del trabajo es obligatorio"),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción del trabajo es obligatoria"),
  body("responsabilidades")
    .trim()
    .notEmpty()
    .withMessage("Los responsabilidades del trabajo son obligatorios"),
  body("salario_minimo")
    .trim()
    .notEmpty()
    .withMessage("El salario mínimo es obligatorio")
    .isNumeric()
    .withMessage("El salario mínimo debe ser numérico"),
  body("salario_maximo")
    .trim()
    .notEmpty()
    .withMessage("El salario máximo es obligatorio")
    .isNumeric()
    .withMessage("El salario máximo debe ser numérico"),
  body("modalidad")
    .trim()
    .notEmpty()
    .withMessage("La modalidad es obligatoria"),
  body("educacion")
    .trim()
    .notEmpty()
    .withMessage("La educación es obligatoria"),
  body("experiencia")
    .trim()
    .notEmpty()
    .withMessage("La experiencia es obligatoria"),
  body("fecha_expiracion")
    .trim()
    .notEmpty()
    .withMessage("La fecha de expiración es obligatoria"),
  body("nivel").trim().notEmpty().withMessage("El nivel es obligatorio"),
  body("ubicacion")
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria"),
  body("cupos")
    .trim()
    .notEmpty()
    .withMessage("Los cupos son obligatorios")
    .isInt({ min: 1 })
    .withMessage("Los cupos deben ser un número positivo"),
  body("aplicar_por")
    .trim()
    .notEmpty()
    .withMessage("El método para aplicar es obligatorio")
    .isIn(["Email", "WorkHub"])
    .withMessage("El método para aplicar debe ser 'Email' o 'WorkHub'"),
];

export const updateTrabajoValidator: ValidationChain[] = [
  param("id_trabajo")
    .trim()
    .notEmpty()
    .withMessage("El id del trabajo es obligatorio")
    .isNumeric()
    .withMessage("El id del trabajo debe ser numérico"),
  body("id_categoria")
    .trim()
    .notEmpty()
    .withMessage("El id de la categoría es obligatorio")
    .isNumeric()
    .withMessage("El id de la categoría debe ser numérico"),
  body("nombre_trabajo")
    .trim()
    .notEmpty()
    .withMessage("El nombre del trabajo es obligatorio"),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción del trabajo es obligatoria"),
  body("responsabilidades")
    .trim()
    .notEmpty()
    .withMessage("Los responsabilidades del trabajo son obligatorios"),
  body("salario_minimo")
    .trim()
    .notEmpty()
    .withMessage("El salario mínimo es obligatorio")
    .isNumeric()
    .withMessage("El salario mínimo debe ser numérico"),
  body("salario_maximo")
    .trim()
    .notEmpty()
    .withMessage("El salario máximo es obligatorio")
    .isNumeric()
    .withMessage("El salario máximo debe ser numérico"),
  body("modalidad")
    .trim()
    .notEmpty()
    .withMessage("La modalidad es obligatoria"),
  body("educacion")
    .trim()
    .notEmpty()
    .withMessage("La educación es obligatoria"),
  body("experiencia")
    .trim()
    .notEmpty()
    .withMessage("La experiencia es obligatoria"),
  body("fecha_expiracion")
    .trim()
    .notEmpty()
    .withMessage("La fecha de expiración es obligatoria"),
  body("nivel").trim().notEmpty().withMessage("El nivel es obligatorio"),
  body("ubicacion")
    .trim()
    .notEmpty()
    .withMessage("La ubicación es obligatoria"),
  body("cupos")
    .trim()
    .notEmpty()
    .withMessage("Los cupos son obligatorios")
    .isInt({ min: 1 })
    .withMessage("Los cupos deben ser un número positivo"),
  body("aplicar_por")
    .trim()
    .notEmpty()
    .withMessage("El método para aplicar es obligatorio")
    .isIn(["Email", "WorkHub"])
    .withMessage("El método para aplicar debe ser 'Email' o 'WorkHub'"),
];
