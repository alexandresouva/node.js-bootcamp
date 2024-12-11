import mongoose from 'mongoose';

async function connectToMongoDB() {
  const connectionString = process.env.MONGODB_CONNECTION;

  if (!connectionString) {
    throw new Error(
      'MONGODB_CONNECTION is not defined in the environment variables.'
    );
  }

  try {
    const connection = await mongoose.connect(connectionString);
    // eslint-disable-next-line no-console
    console.log(`Connected to MongoDB.`);
    return connection;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

export default connectToMongoDB;
