import express from 'express'
import { GetAllProducts, GetProductDetail, DeleteProduct, UpdateProduct } from '../controller/productController.js';
import upload from '../config/multer.js';

const routes = express.Router();

routes.get('/', GetAllProducts);
routes.get('/:id', GetProductDetail);
routes.delete('/:id', DeleteProduct);
routes.put('/:id', upload.single("image"),
    UpdateProduct);

export default routes;