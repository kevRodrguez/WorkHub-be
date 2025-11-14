import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.type === "field" ? error.path : undefined,
      message: error.msg,
      value: error.type === "field" ? error.value : undefined,
    }));

    console.log('🔴 ERRORES DE VALIDACIÓN:', JSON.stringify(formattedErrors, null, 2));
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: formattedErrors,
    });
  }

  next();
};
