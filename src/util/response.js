const messages = require("./message.json");

// Utility function to send a standardized response
exports.response = (
  res,
  status = 200,
  message = "SUCCESS",
  successData = {},
) => {
  return res.status(status).json({
    success: true,
    message: messages[message],
    data: successData,
  });
};

// Error handler for catching and responding to errors
exports.errorHandler = (err, res) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred",
  });
};
