import express from 'express'
import { updateAddress, userLogin } from '../controller/userController.js';

const routes = express.Router();

routes.post('/login', userLogin);

routes.post("/admin/login", userLogin);

routes.put(
"/update-address",
updateAddress
);

export default routes;