import express from 'express';
import { GetOrder, placeOrder, RecentOrders, UpdateOrder } from '../controller/OrderController.js';

const router = express.Router();

router.post('/place-order', placeOrder);
router.get('/orders/recent', RecentOrders);
router.get('/orders/:id', GetOrder);
router.get('/orders/:id/status', UpdateOrder);
router.put('/orders/:id/status', UpdateOrder);


export default router;