import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

const __dirname = import.meta.dirname;
const toursDataPath = path.join(__dirname, 'dev-data', 'data', 'tours.json');
const tours = JSON.parse(fs.readFileSync(toursDataPath, 'utf-8'));

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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
