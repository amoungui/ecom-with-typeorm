import { Request, Response } from "express";
import { getRepository, Connection } from "typeorm";
import { validate } from "class-validator";

import Cart from "../entity/Cart";
import { Product } from "../entity/Product";
import session = require("express-session");

class CartController{
    //this function add one or more product(s) in the cart
    static getInCart = async (req: Request, res: Response) => {
        //Get the ID from the url // i change the type number to the type string
        const productId =  req.params.id; 
        let cart = new Cart(req.session.cart? req.session.cart: {});
        //Get the product from database
        const productRepository = getRepository(Product);
        const product = await productRepository.findOneOrFail(productId, {
            select: ["id", "name", "price"] 
        });
        cart.add(product, product.id);
        req.session.cart = cart;
        req.session.save(function(err) {
            err: "session not save"
        });
        res.status(200).json({
            message: "product added in cart",
            cart: req.session.cart,
            url: "http://localhost:3000/checkout/"
        });
    };

    // this function display the products who is in the cart
    static shopping_cart = async (req: Request, res: Response) => {
        var message = req.session.cart;
        if(!message){
            res.status(200).json({
                message: "Not product in your Cart",
                product: null
            });
        }
        var cart = new Cart(message);
        res.status(200).json({
            message: "you have product(s) in your Cart",
            products: cart.generateArray(),
            totalPrice: cart.totalPrice,
            url: "http://localhost:3000/checkout/"
        });    
    };
};

export default CartController;