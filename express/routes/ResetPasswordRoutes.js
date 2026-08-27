const express = require('express');
const routes = express.Router();
const { ResetPassword } = require('../controller/ResetPasswordController.js');  

routes.post('/reset-password/:token', ResetPassword);
module.exports = routes;