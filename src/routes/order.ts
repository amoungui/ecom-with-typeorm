import { Router } from "express";
import OrderController from "../controllers/OrderController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all products
router.get("/", [checkJwt], OrderController.listAll);

// Get one product
router.get("/:id([0-9]+)", [checkJwt], OrderController.getOneById);

//Create a new product  
router.post("/", [checkJwt], OrderController.newOrder);

//Delete one product  [checkJwt, checkRole(["ADMIN"])]
router.delete("/:id([0-9]+)", [checkJwt] ,OrderController.deleteOrder);

export default router;