const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TrainingSchema = new Schema({
  date: {
    type: String, 
    required: true 
  },
  time: {
    type: String, 
    required: true 
  },
  venue: {
    type: String, 
    required: true 
  }
})

// Export the model
module.exports = mongoose.model('Training', TrainingSchema);