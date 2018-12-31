const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  position: {type: String, required: true },
  first_name: {type: String, required: true },
  last_name: {type: String, required: true },
  email: {type: String, required: true },
  ranking: {type: Number },
  image: {type: String },
  avatar: {type: String }
})

// Export the model
module.exports = mongoose.model('Player', PlayerSchema);