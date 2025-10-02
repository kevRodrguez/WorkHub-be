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
      body("nombre").optional(),
      // biografia es opcional pero si se proporciona debe ser válida
      body("biografia").optional(),
      // telefono es opcional pero si se proporciona debe ser válido
      body("telefono")
        .optional()
        .custom((value) => {
          if (value && !Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        }),
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
      body("ubicacion").optional(),
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
      body("red_social").optional({ values: "falsy" }),
    ];
  }

  // Validaciones para actualizar perfil de empresa
  static actualizarPerfilEmpresa(): ValidationChain[] {
    return [
      // Validar ID en los parámetros
      param("id")
        .notEmpty()
        .isUUID()
        .withMessage("El ID del perfil debe ser un UUID válido"),

      // Todos los campos son opcionales para actualización
      body("nombre").optional(),
      body("biografia").optional(),
      body("telefono")
        .optional()
        .custom((value) => {
          if (value && !Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        }),
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

      body("ubicacion").optional(),
      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      body("link_foto_perfil")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      body("red_social").optional({ values: "falsy" }),
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
        ),
      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isLength({ min: 10, max: 500 })
        .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
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
        ),
      body("descripcion")
        .notEmpty()
        .withMessage("La descripción es requerida")
        .isLength({ min: 10, max: 500 })
        .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
    ];
  }

  // Validaciones para actualizar foro
  static actualizarForo(): ValidationChain[] {
    return [
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID del foro debe ser un número positivo"),

      body("titulo")
        .notEmpty()
        .withMessage("El del foro es requerido")
        .isLength({ min: 2, max: 40 })
        .withMessage("El nombre del foro debe tener entre 2 y 40 caracteres"),
      body("contenido")
        .notEmpty()
        .withMessage("El contenido es requerido")
        .isLength({ min: 10, max: 500 })
        .withMessage("El contenido debe tener entre 10 y 500 caracteres"),
    ];
  }

  // Validaciones para crear foro
  static crearForo(): ValidationChain[] {
    return [
      body("titulo")
        .notEmpty()
        .withMessage("El nombre del foro es requerido")
        .isLength({ min: 2, max: 100 })
        .withMessage("El nombre del foro debe tener entre 2 y 100 caracteres"),
      body("id_perfil")
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Falta id del dueño del foro"),
    ];
  }

  // Validaciones para crear foro
  static validarRespuesta(): ValidationChain[] {
    return [
      body("contenido")
        .notEmpty()
        .withMessage("El contenido de la respuesta es requerido")
        .isLength({ min: 1, max: 500 })
        .withMessage("El nombre del foro debe tener entre 1 y 500 caracteres"),
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
        .withMessage("El nombre debe tener entre 2 y 100 caracteres"),

      body("biografia")
        .notEmpty()
        .withMessage("La biografía es requerida")
        .isLength({ min: 3, max: 1000 })
        .withMessage("La biografía debe tener entre 3 y 1000 caracteres"),

      body("telefono")
        .notEmpty()
        .withMessage("El teléfono es requerido")
        .custom((value) => {
          if (!Validators.isValidPhone(value)) {
            throw new Error("El formato del teléfono no es válido");
          }
          return true;
        }),
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
        .withMessage("La ubicación debe tener entre 2 y 100 caracteres"),

      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      body("link_foto_perfil")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      body("red_social").optional({ values: "falsy" }),
    ];
  }

  // Validaciones para actualizar perfil de candidato
  static actualizarPerfilCandidato(): ValidationChain[] {
    return [
      // Validar ID en los parámetros
      param("id")
        .notEmpty()
        .isUUID()
        .withMessage("El ID del perfil debe ser un UUID válido"),

      // Todos los campos son opcionales para actualización
      body("nombre").optional().trim(),

      body("biografia").optional().trim(),

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
        .optional()
        .isIn(["masculino", "femenino", "otro", "prefiero no decir"])
        .withMessage(
          "El género debe ser uno de: masculino, femenino, otro, prefiero no decir"
        ),

      body("estado_civil")
        .optional()
        .isIn(["soltero", "casado", "divorciado", "viudo", "unión libre"])
        .withMessage(
          "El estado civil debe ser uno de: soltero, casado, divorciado, viudo, unión libre"
        ),

      body("experiencia").optional().trim(),

      body("educacion").optional().trim(),

      body("ubicacion").optional().trim(),

      body("pagina_web")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la página web no es válida"),

      body("link_foto_perfil")
        .optional({ values: "falsy" })
        .isURL()
        .withMessage("La URL de la foto de perfil no es válida"),

      body("red_social").optional({ values: "falsy" }).trim(),

      body("rol")
        .optional()
        .isIn(["candidato", "empresa"])
        .withMessage("El rol debe ser 'candidato' o 'empresa'"),
    ];
  }

  // Validación de parámetros ID (integer)
  static validarIdParametro(): ValidationChain[] {
    return [
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID debe ser un número positivo"),
    ];
  }

  static insertarCurriculum(): ValidationChain[] {
    return [
      body("id_perfil")
        .isInt({ min: 1 })
        .withMessage("El ID del perfil debe ser un número positivo"),

      body("url_curriculum")
        .isURL()
        .withMessage("La URL del currículum no es válida"),
    ];
  }

  static actualizarCurriculum(): ValidationChain[] {
    return [
      param("id")
        .isInt({ min: 1 })
        .withMessage("El ID del currículum debe ser un número positivo"),

      body("id_perfil")
        .isInt({ min: 1 })
        .withMessage("El ID del perfil debe ser un número positivo"),

      body("url_curriculum")
        .isURL()
        .withMessage("La URL del currículum no es válida"),
    ];
  }
}
