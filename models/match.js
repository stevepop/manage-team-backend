const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MatchSchema = new Schema({
  fixture: {
    type: String, 
    required: true 
  },
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
  },
  selection:  [{ type: Schema.Types.ObjectId, ref: 'Player' }]
})

// Export the model
module.exports = mongoose.model('Match', MatchSchema);