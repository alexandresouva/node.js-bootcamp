import { Request, Response } from 'express';
import Tour from '../models/tourModel.ts';
import tourFilterSchema from '../schemas/tourFilterSchema.ts';

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const filters = tourFilterSchema.parse(req.query);
    const paginationOffset = (filters.page - 1) * filters.limit;
    const query = Tour.find(filters)
      .sort(filters.sort)
      .select(filters.fields)
      .skip(paginationOffset)
      .limit(filters.limit);

    const tours = await query.exec();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      hasNextPage: (await Tour.countDocuments()) > paginationOffset,
      data: {
        tours
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        status: 'fail',
        message: error
      });
    }
    res.status(500).json({
      status: 'error',
      message: error
    });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};
