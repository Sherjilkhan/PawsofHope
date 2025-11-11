const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: String,
  breed: String,
  species: String,
  description: String,
  healthInfo: String,
  gender: String,
  image: String,
  adoptionStatus: { type: String, enum: ['available','adopted','pending'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);
