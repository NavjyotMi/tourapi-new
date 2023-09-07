const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../model/tourModel');
// dotenv.config({package: './config'})

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb+srv://navjyot:navjyot@cluster0.cp8jzo9.mongodb.net/natours-app?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('mongodb connected');
    // console.log(`hostname ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data has been successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

importData();
