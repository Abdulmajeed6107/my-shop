 
//  app.get("/test-email",
import express from 'express'
import {sendOrderConfirmationEmail} from '../emailConfirmation.js';

const routes = express.Router();

routes.get("/test-email", sendOrderConfirmationEmail);

export default routes;