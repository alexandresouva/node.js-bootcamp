import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { tourSchema } from '../schemas/tourSchema.ts';

// Temporary: only for simulate data
const __dirname = import.meta.dirname;
const toursDataPath = path.resolve(
  __dirname,
  '../..',
  'dev-data',
  'data',
  'tours-simple.json'
);
const tours: { id: number }[] = JSON.parse(
  fs.readFileSync(toursDataPath, 'utf-8')
);

export const validateTourSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    tourSchema.parse(req.params);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        status: 'fail',
        message: `Invalid ${err.errors[0].path[0]}`,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export const verifyTourExists = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const tour = tours.find((el) => el.id === Number(id));
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found.',
    });
  }

  req.tour = tour;
  next();
};

export const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: req.tour,
    },
  });
};

export const createTour = (req: Request, res: Response) => {
  const { tour } = req.body;
  const newId = (tours.at(-1)?.id ?? 0) + 1;
  const newTour = { id: newId, ...tour };
  tours.push(newTour);

  fs.writeFile(toursDataPath, JSON.stringify(tours), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: 'Could not add tour',
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  });
};

export const updateTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Calm down, function not implemented yet',
    },
  });
};

export const deleteTour = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
