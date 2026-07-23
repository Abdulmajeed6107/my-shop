import express from "express";
import {createReview, getProductReviews} from "../controller/reviewController.js";

const router = express.Router();

router.post("/create", createReview);
router.get("/:productId", getProductReviews);


export default router;