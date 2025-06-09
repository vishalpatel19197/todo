const userModel = require("./userModel");
const bcrypt = require("bcryptjs");
const { response, errorHandler } = require("../../util/response");
const { roleUserModel } = require("../role/roleModel");

exports.add = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const emailExists = await userModel.findOne({ email }).lean();
    if (emailExists) {
      return response(res, 409, "EMAILALREADYEXISTS");
    }

    const hashedPassword =
      process.env.env === "production"
        ? await bcrypt.hash(password, 10)
        : password;

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Set the response status to 201 Created
    return response(res, 201, "USERCREATED", { userId: newUser._id });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.addUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await roleUserModel.findOne({ userId }).lean();
    if (!user) {
      return response(res, 404, "USERNOTFOUND");
    }
    const removeDuplicateRole = [...new Set([...role, ...user.key])];
    await roleUserModel.updateOne(
      { userId: userId },
      { $set: { key: removeDuplicateRole } },
      { upsert: true }
    );

    return response(res, 200, "ROLEASSIGNED", { userId: user._id });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.userStatusUpdate = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const user = await userModel.findOne(userId).lean();
    if (!user) {
      return response(res, 404, "USERNOTFOUND");
    }

    await userModel.updateOne({ _id: userId }, { $set: { status } });

    return response(res, 200, "USERSTATUSUPDATED");
  } catch (error) {
    return errorHandler(error, res);
  }
};
