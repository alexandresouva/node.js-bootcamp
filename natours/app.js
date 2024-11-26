import express from 'express';

const app = express();

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
});

const port = 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}...`);
});
