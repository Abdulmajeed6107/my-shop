import express from 'express';
const routes = express.Router();
const { ResetPassword } = require('../controller/ResetPasswordController.js');  

routes.post('/reset-password/:token', ResetPassword);
export default routes;