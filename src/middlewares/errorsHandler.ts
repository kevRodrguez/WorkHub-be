import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: err.message,
      field: err.field,
    });
    return;
  }

  if (err.name === "NotFoundError") {
    res.status(404).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err.name === "BusinessRuleError") {
    res.status(409).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Si no, responde con 500
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: err.message || "Internal Server Error",
  });
};
