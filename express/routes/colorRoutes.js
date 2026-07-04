import express from 'express';
import { AddColor, DeleteColor, getAllColors, GetProductColor } from '../controller/ColorController.js';

const router = express.Router();

router.get("/colors", getAllColors);                        
router.post('/products/:id/colors', AddColor);
router.get('/products/:id/colors', GetProductColor);
router.delete('/products/:productId/colors/:colorId', DeleteColor);



export default router;