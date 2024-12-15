import { Request, Response } from 'express';
import Tour from '../models/tourModel.ts';
import tourFilterSchema from '../schemas/tourFilterSchema.ts';

// CRUD operations
export const getAllTours = async (req: Request, res: Response) => {
  try {
    const parsedParams = tourFilterSchema.parse(req.query);
    const paginationOffset = (parsedParams.page - 1) * parsedParams.limit;
    const query = Tour.find(parsedParams)
      .sort(parsedParams.sort)
      .select(parsedParams.fields)
      .skip(paginationOffset)
      .limit(parsedParams.limit);

    const tours = await query.exec();
    const responseData = {
      status: 'success',
      results: tours.length,
      hasNextPage:
        req.path === '/'
          ? (await Tour.countDocuments()) > paginationOffset
          : undefined,
      data: {
        tours
      }
    };
    // Only show next page in root path
    if (req.path !== '/') {
      delete responseData.hasNextPage;
    }

    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
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

// Advanced operations
export const applyTopFiveToursQuery = (
  req: Request,
  _res: Response,
  next: Function
) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

export const getToursStats = async (req: Request, res: Response) => {
  try {
    const stats = await Tour.aggregate([
      {
        $group: {
          _id: '$difficulty',
          difficulty: { $first: { $toUpper: '$difficulty' } },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $unset: ['_id']
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        statsByDifficulty: stats
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};

export const getMonthlyPlanByYear = async (req: Request, res: Response) => {
  try {
    const year = Number(req.params.year);

    if (isNaN(year)) {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid year'
      });
      return;
    }

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          month: { $first: { $month: '$startDates' } },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        monthlyPlan: plan
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
};
