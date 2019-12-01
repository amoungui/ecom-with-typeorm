import { Router } from "express";
import CartController from "../controllers/CartControler";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//add one or more products on the cart
router.get("/:id([0-9]+)", [checkJwt], CartController.getInCart);

//Display all the product in the cart 
router.get("/", [checkJwt], CartController.shopping_cart);

export default router;