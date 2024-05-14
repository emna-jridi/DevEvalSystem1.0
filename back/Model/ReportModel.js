const mongoose = require('mongoose')


const reportSchema = new mongoose.Schema({

    created_At: {
        type: Date,
        required: [true, "Please provide a creation date of the demand "],
    },
    idAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    autonomy: {
        type: Number,
        required: [true, "Please provide an anatomy rating"],
    },

    estimation: {
        type: String,
        required: [true, "Please provide an estimation"],
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
    codeQuality: {
        type: Number,
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
        required: [true, "Please provide a minor Bugs rating"] 
    },
})


module.exports= mongoose.model("report", reportSchema)