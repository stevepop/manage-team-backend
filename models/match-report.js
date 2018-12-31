const mongoose = require('mongoose')
const Schema = mongoose.Schema;


let MatchReportSchema = new Schema({
  target: {
    type: Number, 
    required: true 
  },
  actual: {
    type: Number, 
    required: true 
  },
  comment: {
    type: String, 
    required: true
  },
  player: { type: Schema.Types.ObjectId, ref: 'Player' },
  match: { type: Schema.Types.ObjectId, ref: 'Match' }
})

// Export the model
module.exports = mongoose.model('MatchReport', MatchReportSchema);