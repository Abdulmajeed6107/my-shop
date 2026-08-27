import express from 'express';
import { ResetPassword } from '../controller/ResetPasswordController.js';
const routes = express.Router();

routes.post('/reset-password/:token', ResetPassword);
export default routes;