import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodSchema): (req: Request, res: Response, next: NextFunction) => void => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationResult = schema.safeParse(req.body);
        if (!validationResult.success) {
            const errors = validationResult.error.errors.map(error => error.message);
            res.status(400).json({ error: 'Invalid input', details: errors });
            return;
        }
        req.body = validationResult.data;
        next();
    };
};
