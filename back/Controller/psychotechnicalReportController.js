const PsychotechnicalReport = require("../Model/psychotechnicalReport");
const Employee = require("../Model/EmployeeModel");
const { StatusCodes } = require("http-status-codes");

const createpsychotechnicalReport = async (req, res) => {
  try {
    if (
      !req.body.created_At ||
      req.body.attendanceFrequency === undefined ||
      req.body.punctuality === undefined ||
      req.body.absenceCommunication === undefined ||
      req.body.interpersonalRelationships === undefined ||
      req.body.collaboration === undefined ||
      req.body.TechEvalRating === undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide all Psychotechnical Report information!",
      });
    }
    const employeeFound = await Employee.findOne({
      fullName: req.body.employee.fullName,
    });

    const psychotechnicalReport = new PsychotechnicalReport({
      created_At: req.body.created_At,
      idAdmin: req.body.idAdmin,
      employee: {
        id: employeeFound.id,
        fullName: employeeFound.fullName,
      },
      attendanceFrequency: req.body.attendanceFrequency,
      punctuality: req.body.punctuality,
      absenceCommunication: req.body.absenceCommunication,
      interpersonalRelationships: req.body.interpersonalRelationships,
      TotalAttendance: req.body.TotalAttendance,
      collaboration: req.body.collaboration,
      InterpersonalTotal: req.body.InterpersonalTotal,
      TechEvalRating: req.body.TechEvalRating,
      TechEvaltoatal: req.body.TechEvaltoatal,
      total: req.body.total,
  
    });

    await psychotechnicalReport.save();
    res.status(StatusCodes.ACCEPTED).send({
      message: ` psychotechnical Report was registered successfully!`,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const getAllPsychotechnicalReports = async (req, res) => {
  try {
    const psychotechnicalReports = await PsychotechnicalReport.find(
      {}
    ).populate({
      path: "employee",
      select: "id fullName",
    });

    const data = psychotechnicalReports.map((report) => {
      return {
        id: report._id,
        created_At: report.created_At,
        idAdmin: report.idAdmin,
        employee: {
          id: report.employee.id,
          fullName: report.employee.fullName,
        },
        attendanceFrequency: report.attendanceFrequency,
        punctuality: report.punctuality,
        absenceCommunication: report.absenceCommunication,
        TotalAttendance: report.TotalAttendance,
        interpersonalRelationships: report.interpersonalRelationships,
        collaboration: report.collaboration,
        InterpersonalTotal: report.InterpersonalTotal,
        TechEvalRating: report.TechEvalRating,
        TechEvaltoatal: report.TechEvaltoatal,
        total: report.total,
      };
    });
    res.status(StatusCodes.OK).json({ psychotechnicalReports: data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updatePsychotechnicalReport = async (req, res) => {
  try {
    if (
      !req.body.created_At ||
      req.body.attendanceFrequency === undefined ||
      req.body.punctuality === undefined ||
      req.body.absenceCommunication === undefined ||
      req.body.interpersonalRelationships === undefined ||
      req.body.collaboration === undefined ||
      req.body.TechEvalRating === undefined
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide all Psychotechnical Report information!",
      });
    }
    const foundEmployee = await Employee.findOne({
      fullName: req.body.employee.fullName,
    });
    const update = {
      employee: {
        id: foundEmployee._id,
        fullName: foundEmployee.fullName,
      },
      attendanceFrequency: req.body.attendanceFrequency,
      punctuality: req.body.punctuality,
      absenceCommunication: req.body.absenceCommunication,
      interpersonalRelationships: req.body.interpersonalRelationships,
      TechEvalRating: req.body.collaboration,
      collaboration: req.body.collaboration,
      collaboration: req.body.collaboration,
      collaboration: req.body.collaboration,
    };
    const updatedPsychotechnicalReport =
      await PsychotechnicalReport.findByIdAndUpdate(req.params.id, update, {
        new: true,
      });
    if (!updatedPsychotechnicalReport) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Psychotechnical Report not found." });
    }
    return res.status(StatusCodes.OK).json({ updatedPsychotechnicalReport });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const deletePsychotechnicalReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    const psychotechnicalReport = await PsychotechnicalReport.findByIdAndDelete(
      reportId
    );

    if (!psychotechnicalReport) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Psychotechnical Report not found." });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Psychotechnical Report was deleted successfully!" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
const checkReportExists = async (req, res) => {
  try {

    const { employeeName, date } = req.body; 
    if (!employeeName || !date) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide both employee name and the date in the request body!",
      });
    }

    const employeeFound = await Employee.findOne({ fullName: employeeName });
    if (!employeeFound) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Employee not found!",
      });
    }

    // Extracting month and year from the provided date
    const created_At = new Date(date);
    const month = created_At.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
    const year = created_At.getFullYear();

    // Searching for the performance report for the specified employee and date
    const existingReport = await PerformanceReport.findOne({
      "employee.id": employeeFound.id,
      "created_At": created_At
    });

    if (existingReport) {
      return res.status(StatusCodes.OK).json({
        exists: true,
        message: "A performance report exists for this employee and date.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        exists: false,
        message: "No performance report found for this employee and date.",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
module.exports = {

    createpsychotechnicalReport,
    getAllPsychotechnicalReports,
    updatePsychotechnicalReport,
    deletePsychotechnicalReport,
    checkReportExists
    
}

