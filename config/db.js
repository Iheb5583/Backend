const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    });
mongoose.set('strictQuery', true);
module.exports=mongoose;