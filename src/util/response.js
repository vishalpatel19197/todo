const message = require("./message.json");
exports.response = (status = 200, message = "SUCCESS") => {
    return {
        status,
        message : message[message],
    }
};
