const config = require("../Config/AppConfig");
const ROLES = require("../Config/ConstConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const Config = require("../Config/AppConfig");
const { StatusCodes } = require("http-status-codes");

// Function to check if the provided plain password matches the hashed password
const passwordIsValid = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// Function to validate user type
const validUserType = (role) => {
  const allowedUserTypes = [ROLES.RA, ROLES.RPA, ROLES.RTA];
  return allowedUserTypes.includes(role);
};

// Function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, config.secret, {
    algorithm: "HS256",
    expiresIn: 86400,
  });
};
const genrateRefreshToken = (userId, role) => {
  try {
    // Create signed refresh token
    const refreshToken = jwt.sign(
      { id: userId, role: role },
      config.refresh_token_secret,
      {
        algorithm: "HS256",
        expiresIn: 86400,
      }
    );

    // Save 'refresh token hash' to database
    // User.tokens.push({ token: refreshToken });
    //await User.save();
    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token:", error);
  }
};

const checkAuth = async (req, res, next) => {
  if (req.path === "/") {
    return next();
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, Config.secret, {
      algorithm: "HS256",
    });

    // Check if access token has expired
    if (decodedToken.exp <= Date.now() / 1000) {
      const user = await User.findById(decodedToken.id);
      if (!user || !user.refreshToken) {
        throw new Error("Unauthorized");
      }

      // Verify refresh token and generate new access token
      jwt.verify(
        user.refreshToken,
        config.refresh_token_secret,
        (err, decoded) => {
          if (err) {
            throw new Error("Unauthorized");
          }
          const accessToken = generateToken(user.id, user.role);
          res.setHeader("Authorization", "Bearer " + accessToken);
          req.user = { userId: user.id, role: user.role };
          next();
        }
      );
    } else {
      // Token is valid, set user information in request object
      req.user = { userId: decodedToken.id, role: decodedToken.role };
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  passwordIsValid,
  validUserType,
  generateToken,
  genrateRefreshToken,
  checkAuth,
};
