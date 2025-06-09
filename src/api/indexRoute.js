const app = require("express")();

const auth = require('./authentication/authController');
app.post('/singin', auth.singIn);


const { checkAuth } = require('../middleware/authentication') 
app.use(checkAuth)

const userRoute = require("./user/userRoute");
app.use("/user", userRoute);

module.exports = app;
