const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({
  activitieTitle: {
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


const Activity = mongoose.model('activity', activitiesSchema);

module.exports = Activity;