import express from "express";
import { CreateAdress } from "../controller/Createadress.js";

const router = express.Router();

router.post("/create-address", CreateAdress);

export default router;