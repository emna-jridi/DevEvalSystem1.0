const mongoose = require("mongoose");

const finalPerformanceSchema = new mongoose.Schema({
  release: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "release",
    },
    name: {
      type: String,
      default: "non assigned",
    },
  },
  employee: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    fullName: {
      type: String,
      default: "non assigned",
    },
  },
  totalAutonomy: {
    type: Number,
    required: true,
  },
  totalEstimation: {
    type: Number,
    required: true,
  },
  totalConformity: {
    type: Number,
    required: true,
  },
  totalMajorBugs: {
    type: Number,
    required: true,
  },
  totalMinorBugs: {
    type: Number,
    required: true,
  },
  totalDemands: {
    type: Number,
    required: true,
  },
  totalCodeQuality: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("FinalPerformance", finalPerformanceSchema);
