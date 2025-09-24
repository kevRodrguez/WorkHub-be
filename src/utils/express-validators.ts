import { body, param, ValidationChain } from "express-validator";
import { Validators } from "./validators";

export class ExpressValidators {
  // Validaciones para crear perfil de empresa
  static crearPerfilEmpresa(): ValidationChain[] {
    return [
      // id_usuario es obligatorio
      body("id_usuario")
        .notEmpty()
        .isUUID()
        .withMessage("El ID de usuario es requerido"),

      // nombre es opcional pero si se proporciona debe ser válido
      body("nombre")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres")
        .trim(),

      // biografia es opcional pero si se proporciona debe ser válida
      body("biografia")
        .optional()
        .isLength({ min: 10, max: 1000 })
        .withMessage("La biografía debe tener entre 10 y 1000 caracteres")
        .trim(),

      // telefono es opcional pero si se proporciona debe ser válido
      body("telefono")
        .optional()
        .custom((value) => {
          if (value && !Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        })
        .trim(),

      // email es opcional pero si se proporciona debe ser válido
      body("email")
        .optional()
        .isEmail()
        .withMessage("El formato del email no es válido")
        .normalizeEmail(),

      // fecha_nacimiento_fundacion es opcional pero si se proporciona debe ser válida
      body("fecha_nacimiento_fundacion")
        .optional()
        .isISO8601()
        .withMessage(
          "La fecha de fundación debe tener un formato válido (YYYY-MM-DD)"
        )
        .custom((value) => {
          const fecha = new Date(value);
          const hoy = new Date();
          if (fecha > hoy) {
            throw new Error("La fecha de fundación no puede ser futura");
          }
          return true;
        }),

      // ubicacion es opcional pero si se proporciona debe ser válida
      body("ubicacion")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("La ubicación debe tener entre 2 y 100 caracteres")
        .trim(),

      // pagina_web es opcional pero si se proporciona debe ser URL válida
      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      // link_foto_perfil es opcional pero si se proporciona debe ser URL válida
      body("link_foto_perfil")
        .optional({ values: "falsy" }) // Esto considera "", null, undefined como ausente
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      // red_social es opcional
      body("red_social").optional({ values: "falsy" }).trim(),
    ];
  }

  // Validaciones para actualizar perfil de empresa
  static actualizarPerfilEmpresa(): ValidationChain[] {
    return [
      // Validar ID en los parámetros
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID del perfil debe ser un número positivo"),

      // Todos los campos son opcionales para actualización
      body("nombre")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres")
        .trim(),

      body("biografia")
        .optional()
        .isLength({ min: 10, max: 1000 })
        .withMessage("La biografía debe tener entre 10 y 1000 caracteres")
        .trim(),

      body("telefono")
        .optional()
        .custom((value) => {
          if (value && !Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        })
        .trim(),

      body("email")
        .optional()
        .isEmail()
        .withMessage("El formato del email no es válido")
        .normalizeEmail(),

      body("fecha_nacimiento_fundacion")
        .optional()
        .isISO8601()
        .withMessage(
          "La fecha de fundación debe tener un formato válido (YYYY-MM-DD)"
        )
        .custom((value) => {
          const fecha = new Date(value);
          const hoy = new Date();
          if (fecha > hoy) {
            throw new Error("La fecha de fundación no puede ser futura");
          }
          return true;
        }),

      body("ubicacion")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage("La ubicación debe tener entre 2 y 100 caracteres")
        .trim(),

      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      body("link_foto_perfil")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      body("red_social").optional({ values: "falsy" }).trim(),
    ];
  }

  // Validaciones para crear categoría
  static crearCategoria(): ValidationChain[] {
    return [
      body("nombre_categoria")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido")
        .isLength({ min: 2, max: 100 })
        .withMessage(
          "El nombre de la categoría debe tener entre 2 y 100 caracteres"
        )
        .trim(),

      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isLength({ min: 10, max: 500 })
        .withMessage("La descripción debe tener entre 10 y 500 caracteres")
        .trim(),
    ];
  }

  // Validaciones para actualizar categoría
  static actualizarCategoria(): ValidationChain[] {
    return [
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID de la categoría debe ser un número positivo"),

      body("nombre_categoria")
        .notEmpty()
        .withMessage("El nombre de la categoría es requerido")
        .isLength({ min: 2, max: 100 })
        .withMessage(
          "El nombre de la categoría debe tener entre 2 y 100 caracteres"
        )
        .trim(),

      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isLength({ min: 10, max: 500 })
        .withMessage("La descripción debe tener entre 10 y 500 caracteres")
        .trim(),
    ];
  }

  // Validaciones para crear perfil de candidato
  static crearPerfilCandidato(): ValidationChain[] {
    return [
      body("id_usuario")
        .notEmpty()
        .isUUID()
        .withMessage("El ID de usuario es requerido"),

      body("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre debe tener entre 2 y 100 caracteres")
        .trim(),

      body("biografia")
        .notEmpty()
        .withMessage("La biografía es requerida")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La biografía debe tener entre 10 y 1000 caracteres")
        .trim(),

      body("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido")
        .custom((value) => {
          if (!Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        })
        .trim(),

      body("fecha_nacimiento_fundacion")
        .notEmpty()
        .withMessage("La fecha de nacimiento es requerida")
        .isISO8601()
        .withMessage(
          "La fecha de nacimiento debe tener un formato válido (YYYY-MM-DD)"
        )
        .custom((value) => {
          const fecha = new Date(value);
          if (!Validators.isAdult(fecha)) {
            throw new Error("El candidato debe ser mayor de edad (18 años)");
          }
          return true;
        }),

      body("genero")
        .notEmpty()
        .withMessage("El género es requerido")
        .isIn(["masculino", "femenino", "otro", "prefiero no decir"])
        .withMessage(
          "El género debe ser uno de: masculino, femenino, otro, prefiero no decir"
        ),

      body("estado_civil")
        .notEmpty()
        .withMessage("El estado civil es requerido")
        .isIn(["soltero", "casado", "divorciado", "viudo", "unión libre"])
        .withMessage(
          "El estado civil debe ser uno de: soltero, casado, divorciado, viudo, unión libre"
        ),

      body("ubicacion")
        .notEmpty()
        .withMessage("La ubicación es requerida")
        .isLength({ min: 2, max: 100 })
        .withMessage("La ubicación debe tener entre 2 y 100 caracteres")
        .trim(),

      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      body("link_foto_perfil")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      body("red_social").optional({ values: "falsy" }).trim(),
    ];
  }

  // Validación de parámetros ID
  static validarIdParametro(): ValidationChain[] {
    return [
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un número positivo"),
    ];
  }
}
