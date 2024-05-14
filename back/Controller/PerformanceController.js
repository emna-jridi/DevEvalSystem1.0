const PerformanceReport = require("../Model/PerformanceModel");
const Demand = require("../Model/DemandModel");
const Employee = require("../Model/EmployeeModel");
const CodeQuality = require("../Model/CodeQualityModel");
const { StatusCodes } = require("http-status-codes");

const createPerformance = async (req, res) => {
  try {
    if (
      //!req.body.created_At ||
      !req.body.estimation ||
      !req.body.conformity ||
      !req.body.majorBugs ||
      !req.body.minorBugs
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide all Performance Report information!",
      });
    }
    const demandFound = await Demand.findOne({ title: req.body.demand.title });
    const employeeFound = await Employee.findOne({
      fullName: req.body.employee.fullName,
    });

    const existingReport = await PerformanceReport.findOne({
      "demand.id": demandFound.id,
      "employee.id": employeeFound.id,
    });

    if (existingReport) {
      return res.status(StatusCodes.CONFLICT).json({
        message:
          "A performance report already exists for this employee and demand!",
      });
    }

    const performanceReport = new PerformanceReport({
      demand: {
        id: demandFound.id,
        title: demandFound.title,
        releaseName: demandFound.release.name,
      },
      created_At: req.body.created_At,
      employee: {
        id: employeeFound.id,
        fullName: employeeFound.fullName,
      },
      idAdmin: req.body.adminId,
      autonomy: req.body.autonomy,
      estimation: req.body.estimation,
      majorBugs: req.body.majorBugs,
      minorBugs: req.body.minorBugs,
      conformity: req.body.conformity,
      codeOptimization: req.body.codeOptimization,
      perfermance: req.body.perfermance,
      commentedCode: req.body.commentedCode,
      translation: req.body.translation,
      total: req.body.total,
    });

    await performanceReport.save();
    res
      .status(StatusCodes.ACCEPTED)
      .send({ message: ` demand rating was registered successfully!` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
const getAllPerformanceReport = async (req, res) => {
  try {
    const performanceReports = await PerformanceReport.find({})
      .populate({
        path: "demand",
        select: "id title release.name",
      })
      .populate({
        path: "employee",
        select: "id fullName",
      });
    const data = performanceReports.map((report) => {
      return {
        id: report._id,
        demand: {
          id: report.demand.id,
          title: report.demand.title,
          releaseName: report.demand.releaseName,
        },
        created_At: report.created_At,
        idAdmin: report.idAdmin,
        employee: {
          id: report.employee.id,
          fullName: report.employee.fullName,
        },
        estimation: report.estimation,
        autonomy: report.autonomy,
        conformity: report.conformity,
        majorBugs: report.majorBugs,
        minorBugs: report.minorBugs,
        codeOptimization: report.codeOptimization,
        perfermance: report.perfermance,
        commentedCode: report.commentedCode,
        translation: report.translation,
        total: report.total,
        score: report.score,
      };
    });

    res.status(StatusCodes.OK).json({ performanceReports: data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updatePerformaneReport = async (req, res) => {
  try {
    if (
      !req.body.demand.title ||
      !req.body.estimation ||
      !req.body.conformity ||
      !req.body.majorBugs ||
      !req.body.minorBugs
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "please provide all performance information ! " });
    }
    const demandFound = await Demand.findOne({ title: req.body.demand.title });
    const foundEmployee = await Employee.findOne({
      fullName: req.body.employee.fullName,
    });
    const update = {
      demand: {
        id: demandFound._id,
        title: demandFound.title,
        releaseName: demandFound.release.name,
      },
      employee: {
        id: foundEmployee._id,
        fullName: foundEmployee.fullName,
      },
      autonomy: req.body.autonomy,
      estimation: req.body.estimation,
      conformity: req.body.conformity,
      majorBugs: req.body.majorBugs,
      minorBugs: req.body.minorBugs,
      codeOptimization: req.body.codeOptimization,
      perfermance: req.body.perfermance,
      commentedCode: req.body.commentedCode,
      translation: req.body.translation,
      total: req.body.total,
    };

    const updatedPerformaneReport = await PerformanceReport.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!updatedPerformaneReport) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Performance Report not found." });
    }
    return res.status(StatusCodes.OK).json({ updatedPerformaneReport });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const deletePerformanceReport = async (req, res) => {
  try {
    const performanceReportID = req.params.id;
    if (!performanceReportID) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing performance Report ID ." });
    }

    const performanceReport = await PerformanceReport.findByIdAndDelete(
      performanceReportID
    );
    if (!performanceReport) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "performance Report not found." });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "performance Report was deleted successfully!" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const checkPerformanceReportExists = async (req, res) => {
  try {
    console.log(req.body);
    const { employeeName, demandTitle } = req.body;
    if (!employeeName || !demandTitle) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Please provide both employee name and demand title in the request body!",
      });
    }

    const employeeFound = await Employee.findOne({ fullName: employeeName });
    const demandFound = await Demand.findOne({ title: demandTitle });

    const existingReport = await PerformanceReport.findOne({
      "demand.id": demandFound.id,
      "employee.id": employeeFound.id,
    });

    if (existingReport) {
      return res.status(StatusCodes.OK).json({
        exists: true,
        message: "A performance report exists for this employee and demand.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        exists: false,
        message: "No performance report found for this employee and demand.",
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPerformance,
  getAllPerformanceReport,
  updatePerformaneReport,
  deletePerformanceReport,
  checkPerformanceReportExists,
};
