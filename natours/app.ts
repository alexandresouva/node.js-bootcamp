import express from 'express';
import fs from 'fs';
import path from 'path';

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

// Server
const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).send({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});
