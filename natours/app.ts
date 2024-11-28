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
const tours = JSON.parse(fs.readFileSync(toursDataPath, 'utf-8'));

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

app.post('/api/v1/tours', (req, res) => {
  const { _id, ...tour } = req.body;
  const newId = tours.at(-1).id ?? 0 + 1;
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
