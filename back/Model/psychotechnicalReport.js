const mongoose = require("mongoose");

const psychotechnicalReportSchema = new mongoose.Schema({
  created_At: {
    type: Date,
    required: [true, "Please provide a creation date of the demand "],
  },
  idAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
  attendanceFrequency: {
    type: Number,
    required: [true, "Please provide an attendance Frequency rating"],
  },
  punctuality: {
    type: Number,
    required: [true, "Please provide a punctuality rating"],
  },
  absenceCommunication: {
    type: Number,
    required: [true, "Please provide an Absence Communication rating"],
  },
  TotalAttendance: {
    type: Number,
  },
  interpersonalRelationships: {
    type: Number,
    required: [true, "Please provide an interpersonal Relationships rating"],
  },
  collaboration: {
    type: Number,
    required: [true, "Please provide a collaboration & support rating"],
  },
  InterpersonalTotal: {
    type: Number,
  },
  TechEvalRating: {
    type: Number,
    required: [true, "Please provide a TechMonitoring Evaluation rating"],
  },
  TechEvaltoatal: {
    type: Number,
  },
  total: {
    type: Number,
  },

});

module.exports = mongoose.model(
  "psychotechnicalReport",
  psychotechnicalReportSchema
);
