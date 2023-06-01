const { default: mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const childrenSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Children', childrenSchema);
