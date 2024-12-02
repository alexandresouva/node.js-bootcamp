import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validateRequest = (
  schema: ZodSchema<unknown>,
  source: 'params' | 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const message =
      source === 'params'
        ? 'One or more URL parameters are invalid.'
        : 'The request body contains invalid data or is missing required fields.';
    try {
      const data = req[source];
      schema.parse(data);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          status: 'fail',
          message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
      return;
    }
  };
};
