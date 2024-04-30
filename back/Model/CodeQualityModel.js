const mongoose = require("mongoose");

const codeQualitySchema = new mongoose.Schema({
  codeOptimization: {
    type: Number,
    required: [true, "Please provide a code Optimization rating"],
  },
  perfermance: {
    type: Number,
    required: [true, "Please provide a code perfermance rating"],
  },
  commentedCode: {
    type: Number,
    required: [true, "Please provide a rating for code commenting"],
  },
  translation: {
    type: Number,
    required: [true, "Please provide a code translation rating"],
  },
  total: {
    type: Number,
    default: 0
  },

});

module.exports = mongoose.model("codeQuality", codeQualitySchema);
