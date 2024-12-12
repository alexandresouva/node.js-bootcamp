/* eslint-disable no-console */
import 'dotenv/config';
import fs from 'fs';
import Tour from '../../src/models/tourModel.ts';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectToMongoDB from '../../src/config/mongodb.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tourDataPath = join(__dirname, 'tours-simple.json');
const tours = JSON.parse(fs.readFileSync(tourDataPath, 'utf-8'));

const importData = async () => {
  try {
    const connection = await connectToMongoDB();
    await Tour.create(tours);
    console.log('Data successfully loaded!');
    await connection.disconnect();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await connectToMongoDB();
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  const environment = process.env.NODE_ENV;
  if (!environment || environment !== 'local') {
    console.log('This script can only be run in local environment.');
    process.exit(1);
  }

  if (process.argv[2] === '--import') {
    await importData();
  } else if (process.argv[2] === '--delete') {
    await deleteData();
  }

  process.exit();
})();
