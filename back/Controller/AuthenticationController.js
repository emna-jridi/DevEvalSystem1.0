const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const ROLES = require('../Config/ConstConfig')
const { passwordIsValid, validUserType, generateToken } = require("../Service/AuthService");


// Login controller
const login = async (req, res) => {
    try {
        // Check if email and password are provided
        if (!req.body.email || !req.body.password) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "Please provide an email and password !" });
        }
        // Find user by email
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "user does not exist." });

        }

        // Validate password
        if (!passwordIsValid(req.body.password, foundUser.password)) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        // Check if user type is valid
        const userTypeIsValid = validUserType(foundUser.userType);

        if (!userTypeIsValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "User does not have permission to connect." });
        }
        // Generate token and send response
        const token = generateToken(foundUser.id, foundUser.userType);
        res
            .status(StatusCodes.ACCEPTED)
            .json({ message: "User logged in successfully.", accessToken: token });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Error during the authentication." });
    }
};

// Register controller
const register = async (req, res) => {
    try {
        // Check if user with given email already exists
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "User already exists." });
        }
        // // Check if user has permission to register
        // if (req.body.userType != ROLES.RA) {
        //     return res
        //         .status(StatusCodes.FORBIDDEN)
        //         .json({ message: "User does not have permission to register" });
        // }
        // Create new user and save to database
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userType: ROLES.RA,
        });

        await user.save();
        res
            .status(StatusCodes.ACCEPTED)
            .send({ message: "User was registered successfully!" });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: error.message });
    }
};
const logout = async (req, res) => {

};


const adminExists= async (req, res) => {
    try {
        const adminUser = await User.findOne({ userType: ROLES.RA });
        if (adminUser) {
            return res.status(200).json({ exists: true });
          }
          return res.status(200).json({ exists: false });
    } catch (error) {
        console.error("Error checking admin user:", error);
        return res.status(500).json({ message: "Error checking admin user." });
    }
}


module.exports = { login, register, logout ,adminExists}