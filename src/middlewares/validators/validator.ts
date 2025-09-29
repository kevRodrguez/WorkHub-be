import { body, param, validationResult, ValidationChain } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const runValidations = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            await validation.run(req)
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        return res.status(400).json({
            status: "Error",
            error: errors.array()
        })
    }
}

export const createUserValidators: ValidationChain[] = [
    body('nombre').trim().notEmpty().isULID().withMessage('El nombre es obligatorios'),
    body('email').trim().notEmpty().isEmail().withMessage('El email no es valido'),
    body('contrasenia').isLength({ min: 8 }).withMessage('La contraseña es invalida!!')
]

export const updateUserValidators: ValidationChain[] = [
    param('id_usuario').trim().notEmpty().withMessage("el id del usuario es obligatorio"),
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorios'),
    body('email').trim().notEmpty().isEmail().withMessage('El email no es valido'),
    body('contrasenia').isLength({ min: 8 }).withMessage('La contraseña es invalida!!')
]

export const deleteUsersValidators: ValidationChain[] = [
    param('id_usuario').trim().notEmpty().isULID().withMessage("el id del usuario es obligatorio"),
]

export const buscarUsuarioPorEmailValidators: ValidationChain[] = [
    param('email').trim().notEmpty().isEmail().withMessage('El email no es valido'),
]

export const buscarUsuarioPorNombreValidators: ValidationChain[] = [
    param('nombre').trim().notEmpty().isULID().withMessage('El nombre es obligatorios'),
]
