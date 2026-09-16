
import express from 'express'
import { AddProduct, GetOrdersByUser,  Orders, Getusers } from '../controller/AdminController.js';
import upload from '../config/multer.js';


const routes = express.Router();

routes.post('/add-product', (req, res, next) => {
	upload.single('image')(req, res, (error) => {
		if (error) {
			return res.status(400).json({
				status: false,
				message: error.message || 'Invalid product image'
			});
		}
		next();
	});
}, AddProduct);
routes.get('/orders' , Orders);
routes.get('/allusers', Getusers);
routes.get('/:user_id', GetOrdersByUser);


export default routes;