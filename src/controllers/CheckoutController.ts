import { Request, Response } from "express";

import Cart from "../entity/Cart";
import { Product } from "../entity/Product";
import session = require("express-session");
import * as Stripe from 'stripe';

class CheckoutController{
    static getCheckout = async (req: Request, res: Response) => {
        var message = req.session.cart;
        if(!message){
            res.status(200).json({
                message: "Not product in your Cart",
                url: "http://localhost:3000/"
            });
        }
        var cart = new Cart(message);
        
        res.status(200).json({
            message: "Checkout your shopping cart",
            //products: cart.generateArray(),
            totalPrice: cart.totalPrice,
            buttonInfo: "Following the link to buy your commande with Stripe API",
            request: {
                type: "POST",
                BuyWithStripe: "http://localhost:3000/checkout/"
            }        
        });    
    };
    
    static checkout = async (req: Request, res: Response) =>{
        var data = req.body;
        var message = req.session.cart;
        var token = null;
        //console.log(data);
        if(!message){
            res.status(200).json({
                message: "Not product in your Cart",
                url: "http://localhost:3000/"
            });
        }
        var cart = new Cart(message);
    
        var stripe = require("stripe")("sk_test_ygWt2bASL7DDcGjNzcylg8Qr");
        
        stripe.tokens.create({
          card: {
            "number": data.number,
            "exp_month": data.exp_month,
            "exp_year": data.exp_year,
            "cvc": data.cvc
          }
        }, function(err, token) {
            res.status(201).json({
                message: "Successfully bought product!",
                token: token
            });
        });

        // Create a new customer and then a new charge for that customer:
        stripe.customers
        .create({
            email: 'foo-customer@example.com',
        })
        .then((customer) => {
            return stripe.customers.createSource(customer.id, {
            source: 'tok_visa',
            });
        })
        .then((source) => {
            return stripe.charges.create({
            amount: cart.totalPrice*100,
            currency: 'usd',
            customer: source.customer,
            });
        })
        .then((charge) => {
            // New charge created on a new customer
        })
        .catch((err) => {
            // Deal with an error
        }); 
    };
};

export default CheckoutController;