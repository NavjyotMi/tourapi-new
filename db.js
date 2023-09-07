const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongodb connected');
    // console.log(`hostname ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
// const connect =
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'name cannot be left empty'],
//     unique: true,
//   },
//   rating: {
//     type: Number,
//     default: 4.5,
//   },
//   price: {
//     type: Number,
//     required: [true, 'a tour cannot have empty price'],
//   },
// });

// const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'Navjyot Kumar Mishra',
//   price: 34,
// });
// testTour.save();

module.exports = connectDB;
