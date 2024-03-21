const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const ROLES = require('../Config/ConstConfig')
const { passwordIsValid, validUserType, generateToken,  } = require("../Service/AuthService");
const Employee = require("../Model/EmployeeModel")
const cookieParser = require('cookie-parser');

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
        const userTypeIsValid = validUserType(foundUser.role);

        if (!userTypeIsValid) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "User does not have permission to connect." });
        }
        // Generate token and send response
        const accessToken = generateToken(foundUser.id, foundUser.role);
        //const refreshToken = generateRefreshToken(foundUser.id, foundUser.role)
       // res.cookie('accessToken', accessToken, { maxAge: 86400  })
        //res.cookie('refreshToken', refreshToken, { maxAge: 604800, httpOnly: true, secure: true, sameSite: 'strict' })

        res
            .status(StatusCodes.ACCEPTED)
            .json({ message: "User logged in successfully.", accessToken: accessToken });
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
            role: ROLES.RA,
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

        return res
          .clearCookie("access_token")
          .status(200)
          .json({ message: "Successfully logged out " });
    
};


const adminExists = async (req, res) => {
    try {
        const adminUser = await User.findOne({ role: ROLES.RA });
        if (adminUser) {
            return res.json({ exists: true });
        }
        return res.status(200).json({ exists: false });
    } catch (error) {
        console.error("Error checking admin user:", error);
        return res.status(500).json({ message: "Error checking admin user." });
    }
}


const emailExist = async (req, res) => {
    try {
        const email = req.params.email;
        const employee = await Employee.findOne({ email });
        if (employee) {
            return res.json({ exists: true, type: 'employee' });
        }
        const agent = await User.findOne({ email });
        if (agent) {
            return res.json({ exists: true, type: 'agent' });
        }

        return res.json({ exists: false });
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { login, register, logout, adminExists, emailExist }