const FinalPerformance = require("../Model/FinalPerformanceModel");
const PerformanceReport = require("../Model/PerformanceModel");
const Release = require("../Model/ReleaseModel");
const Employee = require("../Model/EmployeeModel");
const { StatusCodes } = require("http-status-codes");

const performCalculations = (performanceReports) => {
  const totalsByEmployee = {};
  performanceReports.forEach((report) => {
    const employeeId = report.employee.id;
    if (!totalsByEmployee[employeeId]) {
      totalsByEmployee[employeeId] = {
        totalAutonomy: 0,
        totalEstimation: 0,
        totalConformity: 0,
        totalCodeQuality: 0,
        totalMajorBugs: 0,
        totalMinorBugs: 0,
        totalDemands: 0,
        score: 0,
      };
    }
    totalsByEmployee[employeeId].totalAutonomy += report.autonomy;
    totalsByEmployee[employeeId].totalEstimation += report.estimation;
    totalsByEmployee[employeeId].totalConformity += report.conformity;
    totalsByEmployee[employeeId].totalCodeQuality += report.total;
    totalsByEmployee[employeeId].totalMajorBugs += report.majorBugs;
    totalsByEmployee[employeeId].totalMinorBugs += report.minorBugs;
    totalsByEmployee[employeeId].totalDemands++;
    totalsByEmployee[employeeId].score +=
      report.autonomy +
      report.estimation +
      report.conformity +
      report.total +
      report.majorBugs +
      report.minorBugs;
  });
  return totalsByEmployee;
};

const calculateFinalPerformance = async (req, res) => {
  try {
    const releaseName = req.params.releaseName;
    const employee = req.body.selectedEmployee;
   console.log(req.body); 
    if (!releaseName || !employee) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all information!" });
    }
    const foundEmployee = await Employee.findOne({ fullName: employee });
    console.log(foundEmployee);
    const employeeId = foundEmployee._id;
    const performanceReports = await PerformanceReport.find({
      $and: [
        { "demand.releaseName": releaseName },
        { "employee.id": foundEmployee._id },
      ],
    });

    const totalsByEmployee = performCalculations(performanceReports);
    const foundRelease = await Release.findOne({ name: releaseName });
    const finalPerformances = Object.entries(totalsByEmployee).map(
      ([employeeId, totals]) => {
        return {
          employee: { id: employeeId, fullName: employee },
          release: {
            id: foundRelease.id,
            name: foundRelease.name,
          },
          totalAutonomy: totals.totalAutonomy,
          totalEstimation: totals.totalEstimation,
          totalConformity: totals.totalConformity,
          totalMajorBugs: totals.totalMajorBugs,
          totalMinorBugs: totals.totalMinorBugs,
          totalDemands: totals.totalDemands,
          totalCodeQuality: totals.totalCodeQuality,
          score: totals.score,
        };
      }
    );
    await FinalPerformance.insertMany(finalPerformances);
    res.status(StatusCodes.OK).json({
      message: "Final performances calculated and saved successfully",
    });
  } catch (error) {
    console.error("Error calculating final performances for release:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error calculating final performances for release" });
  }
};

const getAllFinalPerformances = async (req, res) => {
  try {
    const finalPerformances = await FinalPerformance.find();
    if (finalPerformances.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No final performances found" });
    }
    const data = finalPerformances.map((performance) => {
      return {
        employee: {
          id: performance.employee.id,
          fullName: performance.employee.fullName,
        },
        release: {
          id: performance.release.id,
          name: performance.release.name,
        },
        autonomy: performance.totalAutonomy,
        estimation: performance.totalEstimation,
        conformity: performance.totalConformity,
        majorBugs: performance.totalMajorBugs,
        minorBugs: performance.totalMinorBugs,
        codeQuality: performance.totalCodeQuality,
        totalDemands: performance.totalDemands,
        score: performance.score,
      };
    });

    // Envoyer les performances finales en réponse
    res.status(StatusCodes.OK).json({ finalPerformances: data });
  } catch (error) {
    console.error("Error fetching final performances:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching final performances" });
  }
};

const updateFinalPerformance = async (req, res) => {
  try {
    const releaseName = req.params.releaseName;
    const employee = req.body.selectedEmployee;
    if (!releaseName || !employee) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all information!" });
    }

    const foundEmployee = await Employee.findOne({ fullName: employee });
console.log(foundEmployee);
    if (!foundEmployee) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Employee not found" });
    }

    let final= await FinalPerformance.findOne({
      "employee.id": foundEmployee._id,
      "release.name": releaseName,
    });
    console.log(final);
    if (!final) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Final performance not found" });
    }

    const performanceReports = await PerformanceReport.find({
      $and: [
        { "demand.releaseName": releaseName },
        { "employee.id": foundEmployee._id },
      ],
    });
    const calculatedPerformance = performCalculations(performanceReports);

    final.totalAutonomy =
      calculatedPerformance[foundEmployee._id].totalAutonomy;
      final.totalEstimation =
      calculatedPerformance[foundEmployee._id].totalEstimation;
      final.totalConformity =
      calculatedPerformance[foundEmployee._id].totalConformity;
      final.totalMajorBugs =
      calculatedPerformance[foundEmployee._id].totalMajorBugs;
      final.totalMinorBugs =
      calculatedPerformance[foundEmployee._id].totalMinorBugs;
      final.totalDemands =
      calculatedPerformance[foundEmployee._id].totalDemands;
      final.totalCodeQuality =
      calculatedPerformance[foundEmployee._id].totalCodeQuality;

    // Calculate the score
    const employeeTotals = calculatedPerformance[foundEmployee._id];
    const score =
      employeeTotals.totalAutonomy +
      employeeTotals.totalEstimation +
      employeeTotals.totalConformity +
      employeeTotals.totalMajorBugs +
      employeeTotals.totalMinorBugs +
      employeeTotals.totalCodeQuality;

      final.score = score;

    await final.save();

    res.status(StatusCodes.OK).json({
      message: "Final performance updated successfully",
    });
  } catch (error) {
    console.error("Error updating final performance:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error updating final performance" });
  }
};
module.exports = {
  calculateFinalPerformance,
  getAllFinalPerformances,
  updateFinalPerformance,
};
