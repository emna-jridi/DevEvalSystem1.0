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
    )

    // Save 'refresh token hash' to database
   // User.tokens.push({ token: refreshToken });
    //await User.save();
    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token:", error);
  
  }
};



const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decodedToken = jwt.verify(token, config.secret);

      // Check if access token has expired
      if (decodedToken.exp <= Date.now() / 1000) { const user=await User.findById(decodedToken.sub); 
        // Check if user exists and has a refresh token 
        if (!user || !user.refreshToken) { throw new Error('Unauthorized'); } 
          // Verify refresh token and generate new access token 
          jwt.verify(user.refreshToken, config.refresh_token_secret, (err, decoded)=> {
            if (err) {
            throw new Error('Unauthorized');
            }
            const accessToken = generateToken(user.id,user.role);
            res.setHeader('Authorization', 'Bearer ' + accessToken);
            next();
          });
        } else {
          next();
        }
      } else {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };


// Middleware function to authorize user based on role
const authorization = (roles) => async (req, res, next) => {
  try {
    // Extract token from authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    // Verify and decode token
    const decoded = jwt.verify(token, Config.secret);
    const { id, role } = decoded;
    // Check if user type matches the required role
    if (!roles.includes(role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource." });
    }
    // Set user information in request object
    req.user = { userId: id, role };
    // Call next middleware
    next();
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error during the authentication." });
  }
};

const authorizationTwoRoles = (role1, role2) => async (req, res, next) => {
  try {
    // Extract token from authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // Verify and decode token
    const decoded = jwt.verify(token, Config.secret);
    const { id, role } = decoded;
    // Check if user type matches one of the required roles
    if (role !== role1 && role !== role2) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource." });
    }
    // Set user information in request object
    req.user = { userId: id, role };
    // Call next middleware
    next();
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error during the authentication." });
  }
};
const authorizationAdminOrRPA = authorizationTwoRoles(ROLES.RA, ROLES.RPA);
const authorizationAdminOrRTA = authorizationTwoRoles(ROLES.RA, ROLES.RTA);
const authorizationAdmin = authorization(ROLES.RA);
const authorizationRTA = authorization(ROLES.RTA);
const authorizationRPA = authorization(ROLES.RPA);

const authorizationAllRoles = authorization(Object.values(ROLES));
module.exports = {
  passwordIsValid,
  validUserType,
  generateToken,
  authorizationAdminOrRPA,
  authorizationAdmin,
  authorizationRTA,
  authorizationRPA,
  authorizationAllRoles,
  authorizationAdminOrRTA,
  genrateRefreshToken,
  checkAuth,
};
