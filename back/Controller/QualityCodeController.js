const CodeQuality = require("../Model/CodeQualityModel");
const { StatusCodes } = require("http-status-codes");

const createCodeQualityRating = async (req, res) => {
  try {
    if (
      !req.body.codeOptimization ||
      !req.body.perfermance ||
      !req.body.commentedCode ||
      !req.body.translation
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide all Code Quality information!",
      }); 
    }

    const codeQuality = new CodeQuality({
      codeOptimization: req.body.codeOptimization,
      perfermance: req.body.perfermance,
      commentedCode: req.body.commentedCode,
      translation: req.body.translation,
    });
    await codeQuality.save();
    res
      .status(StatusCodes.ACCEPTED)
      .send({ message: ` code Quality rating was registered successfully!` });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const getAllData = async (req, res) => {
  try {
    const codeQuality = await CodeQuality.find({});
    const data = codeQuality.map((codeQuality) => {
      return {
        codeOptimization: codeQuality.codeOptimization,
        perfermance: codeQuality.perfermance,
        commentedCode: codeQuality.commentedCode,
        translation: codeQuality.translation,
      };
    });
    res.status(StatusCodes.ACCEPTED).json({ codeQuality: data });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const updateQualityCodeRating = async (req, res) => {
  try {
    if (
      !req.body.codeOptimization ||
      !req.body.perfermance ||
      !req.body.commentedCode ||
      !req.body.translation
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide all Quality Code information!" });
    }
    const update = {
      codeOptimization: req.body.codeOptimization,
      perfermance: req.body.perfermance,
      commentedCode: req.body.commentedCode,
      translation: req.body.translation,
    };
    const updatedQualityCodeRating = await CodeQuality.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!updatedQualityCodeRating) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Data not found." });
    }

    res.status(StatusCodes.OK).json({ updatedQualityCodeRating });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};

const deleteQualityCodeRating = async (req, res) => {
    try {
        const qualityCodeRatingID = req.params.id ; 
        if (!qualityCodeRatingID){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Missing Quality Code Rating ID." });
        }

        const  qualityCodeRating = await CodeQuality.findByIdAndDelete(qualityCodeRatingID); 
        if (!qualityCodeRating){
            return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Quality Code Rating not found." });
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: error.message });
    }
};


module.exports= {
    createCodeQualityRating, 
    getAllData,
    updateQualityCodeRating,
    deleteQualityCodeRating,
}