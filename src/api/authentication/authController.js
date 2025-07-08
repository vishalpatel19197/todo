const { response, errorHandler } = require("../../util/response");
const userModel = require("../user/userModel");
const bcrypt = require("bcryptjs");
const { genToken, verifyToken } = require("../../util/commen");

exports.singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return response(res, 400, "VALIDATIONERROR");
    }

    // userFind: Check if user exists
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      return response(res, 404, "USERNOTFOUND");
    }

    // userStatus: Check if user is active
    if (user.status !== "active") {
      return response(res, 403, "USERINACTIVE");
    }

    // Check password
    const isPasswordMatch =
      process.env.env === "production"
        ? bcrypt.compareSync(password, user.password)
        : password === user.password;
    if (!isPasswordMatch) {
      return response(res, 401, "INVALIDPASSWORD");
    }

    // Generate JWT
    const token = genToken(
      {
        _id: user._id,
        email: user.email,
        type: user.type,
      },
      { expiresIn: "1h" }
    );
    // ✅ Set token as HTTP cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Cookie cannot be accessed via JavaScript
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax", // Helps with CSRF protection
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Return success response
    return response(res, 200, "LOGINSUCCESS", {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token, // Include the JWT in the response
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.logOut = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax",
    });

    // Return success response
    return response(res, 200, "LOGOUTSUCCESS");
  } catch (error) {
    return errorHandler(error, res);
  }
};
