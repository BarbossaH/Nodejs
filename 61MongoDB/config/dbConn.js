/**
 * connect the mongoDB
 */

const { default: mongoose } = require('mongoose');

const connectDB = async () => {
  try {
    //DATABASE_URL,note to add the name dataDB in the database url we want to store in, or the default name will be test
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
