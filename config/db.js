const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //importing config module allows us to store mongoURI into variable 'db'

const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,//Needed to prevent warnings
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
  
      console.log('MongoDB Connected...');//if, success message, else
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;