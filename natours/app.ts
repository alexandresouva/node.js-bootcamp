import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// Temporary: only for simulate data
const __dirname = import.meta.dirname;
const toursDataPath = path.join(
  __dirname,
  'dev-data',
  'data',
  'tours-simple.json'
);
const tours: { id: number }[] = JSON.parse(
  fs.readFileSync(toursDataPath, 'utf-8')
);

// Middlewares
const app = express();
app.use(express.json());

// Routes functions
const getAllTours = (req: Request, res: Response) => {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));

  if (!tour) {
    res.status(404).send({
      status: 'fail',
      message: 'Tour not found',
    });
    return;
  }

  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req: Request, res: Response) => {
  const { tour } = req.body;
  const newId = (tours.at(-1)?.id ?? 0) + 1;
  const newTour = { id: newId, ...tour };
  tours.push(newTour);

  fs.writeFile(toursDataPath, JSON.stringify(tours), 'utf-8', (err) => {
    if (err) {
      res.status(500).send({
        status: 'error',
        message: 'Could not add tour',
      });
    } else {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  });
};

const updateTour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));

  if (!tour) {
    res.status(404).send({
      status: 'fail',
      message: 'Tour not found',
    });
    return;
  }

  res.status(200).send({
    status: 'success',
    data: {
      tour: 'Calm down, function not implemented yet',
    },
  });
};

const deleteTour = (req: Request, res: Response) => {
  const { id } = req.params;
  const tour = tours.find((el) => el.id === Number(id));

  if (!tour) {
    res.status(404).send({
      status: 'fail',
      message: 'Tour not found',
    });
    return;
  }

  res.status(204).send({
    status: 'success',
    data: null,
  });
};

// Routes
// prettier-ignore
app.
  route('/api/v1/tours').
  get(getAllTours).
  post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Starting erver
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
