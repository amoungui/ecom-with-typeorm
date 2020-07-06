import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import product from "./product";
import order from "./order";
import cart from "./cart";
import checkout from "./checkout";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/", product);
routes.use("/order", order);
routes.use("/cart", cart);
routes.use("/checkout", checkout);

export default routes;