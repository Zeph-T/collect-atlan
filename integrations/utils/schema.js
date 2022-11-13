const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const baseSchema = new Schema({}, { strict: false });

exports.responseSchema = mongoose.model(
  'response',
  baseSchema,
  "response"
);
