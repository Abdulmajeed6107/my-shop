    import express from 'express';
    import { addToCart } from '../controller/cartController.js';
    import { cartItems } from '../controller/cartController.js';
    import { removeFromCart } from '../controller/cartController.js';

    const routes = express.Router();

    routes.post('/', addToCart);
    routes.get('/:user_id', cartItems);
    routes.delete('/:id', removeFromCart);

    export default routes;