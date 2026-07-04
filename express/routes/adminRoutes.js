
import express from 'express'
import { AddProduct, GetOrdersByUser,  Orders, Getusers } from '../controller/AdminController.js';
import upload from '../config/multer.js';


const routes = express.Router();

routes.post('/add-product', upload.single('image') ,AddProduct);
routes.get('/orders' , Orders);
routes.get('/allusers', Getusers);
routes.get('/:user_id', GetOrdersByUser);


export default routes;