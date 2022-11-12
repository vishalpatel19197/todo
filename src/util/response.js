const messages = require("./message.json");

exports.response = (
  status = 200,
  message = "SUCCESS",
  successData = undefined,
  res
) => {
  return res.status(status).json({
    success: true,
    message: messages[message],
    data: successData,
  });
};

exports.errorHandler = (err, res) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
};
