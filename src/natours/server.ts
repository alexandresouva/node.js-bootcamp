import 'dotenv/config';
import app from './src/app.ts';
import connectToMongoDB from './src/config/mongodb.ts';

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});

connectToMongoDB();
