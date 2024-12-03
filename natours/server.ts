import 'dotenv/config';
import app from './src/app.ts';

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
