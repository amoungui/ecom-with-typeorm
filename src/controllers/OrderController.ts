import { Request, Response } from "express";
import { getRepository, Connection } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entity/Product";
import { Order } from "../entity/Order";

class OrderController{
    static listAll = async (req: Request, res: Response) => {
        //Get orders from database
        const orderRepository = getRepository(Order);
        const orders = await orderRepository.find({
          select: ["id", "product", "quantity"] //
        });
      
        //Send the users object
        res.send(orders);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url // i change the type number to the type string
        const id: string =  req.params.id;
      
        //Get the product from database
        const orderRepository = getRepository(Order);
        
        try {
          const order = await orderRepository.findOneOrFail(id, {
            select: ["id", "product", "quantity"] 
          });
          res.status(200).send(order);
        } catch (error) {
          res.status(404).send("Order not found");
        }
    };

    static newOrder = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { productId, quantity } = req.body;
        //Get product if exist in db
        const productRepository = getRepository(Product);
        const product = await productRepository.findOneOrFail(productId, {
          select: ["id", "name", "price"] 
        });
        //
        let order = new Order();
        order.quantity = quantity;
        order.product = product;
        const orderRepository = getRepository(Order);

        try {
          await orderRepository.save(order);
        } catch (e) {
          res.status(409).send("error 404");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("Order created");
    }; 

    static deleteOrder = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const orderRepository = getRepository(Order);
        let order: Order;
        try {
          order = await orderRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("Order not found");
          return;
        }
        orderRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };    
};

export default OrderController;