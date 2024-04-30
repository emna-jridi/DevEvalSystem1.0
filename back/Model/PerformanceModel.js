const { string } = require("joi");
const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  created_At: {
    type: Date,
   // required: [true, "Please provide a creation date of the demand "],
  },
  idAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  demand: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "demand",
    },
    title: {
      type: String,
    },
    releaseName: {
      type: String,
      default: "non assigned", 
    },
  },

  employee: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    fullName:{
      type: String,
      default: "non assigned",
    }
  },
  autonomy: {
    type: Number,
    required: [true, "Please provide an anatomy rating"],
  },

  estimation: {
    type: Number,
    required: [true, "Please provide an estimation"],
  },

  conformity: {
    type: Number,
    required: [true, "Please provide a conformity rating"],
  },
  majorBugs: {
    type: Number,
    required: [true, "Please provide a majorBugs rating"],
  },
  minorBugs: {
    type: Number,
    required: [true, "Please provide a minor Bugs rating"],
  },
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

  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("performance", performanceSchema);
