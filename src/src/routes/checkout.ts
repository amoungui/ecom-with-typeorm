import { Router } from "express";
import CheckoutController from "../controllers/CheckoutController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all   
router.get("/", [checkJwt], CheckoutController.getCheckout);

//Create a new commande  
router.post("/", [checkJwt], CheckoutController.checkout);


export default router;