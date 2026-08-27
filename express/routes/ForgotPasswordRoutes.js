
import express from 'express'
import { ForgotPassword } from '../controller/RequestResetController.js';

const routes = express.Router();

routes.post('/forgot-password', ForgotPassword);


export default routes;

