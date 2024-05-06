// const mongoose = require('mongoose');
// require('dotenv').config();
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//     });
// mongoose.set('strictQuery', true);
// module.exports=mongoose;
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@cluster0.csfkjt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
module.exports=mongoose;