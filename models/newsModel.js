const mongoose = require('mongoose')

const nwesSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, 'Please enter a title'],
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
    lowercase: true,
  },
});



const News = mongoose.model('news', newsSchema);

module.exports = News;