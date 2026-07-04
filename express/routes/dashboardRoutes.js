
import express from 'express'
import { getDashboardStats } from '../controller/dashBoardController';


const routes = express.Router();

routes.get('/stats', getDashboardStats);


export default routes;