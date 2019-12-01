import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entity/Product";

class ProductController{
    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const productRepository = getRepository(Product);
        const products = await productRepository.find({
          select: ["id", "name", "price"]          
        });

        //Send the users object
        res.send(products);   
    };
      
    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url // i change the type number to the type string
        const id: string =  req.params.id;
      
        //Get the product from database
        const productRepository = getRepository(Product);
        
        try {
          const user = await productRepository.findOneOrFail(id, {
            select: ["id", "name", "price"] 
          });
          res.status(200).send(user);
        } catch (error) {
          res.status(404).send("Product not found");
        }
    };
      
    static newProduct = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { name, price } = req.body;
        let product = new Product();
        product.name = name;
        product.price = price;
      
        //Validade if the parameters are ok
        const errors = await validate(product);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to save. If fails, the username is already in use
        const ProductRepository = getRepository(Product);
        try {
          await ProductRepository.save(product);
        } catch (e) {
          res.status(409).send("product already in use");
          return;
        }
      
        //If all ok, send 201 response
        res.status(201).send("Product created");
    }; 
      
    static editProduct = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        //Get values from the body
        const { name, price } = req.body;
      
        //Try to find user on database
        const productRepository = getRepository(Product);
        let product;
        try {
          product = await productRepository.findOneOrFail(id);
        } catch (error) {
          //If not found, send a 404 response
          res.status(404).send("Product not found");
          return;
        }
      
        //Validate the new values on model
        product.name = name;
        product.price = price;
        const errors = await validate(product);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Try to safe, if fails, that means username already in use
        try {
          await productRepository.save(product);
        } catch (e) {
          res.status(409).send("name already in use");
          return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send(); 
    };
    
    static deleteProduct = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
      
        const productRepository = getRepository(Product);
        let product: Product;
        try {
          product = await productRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("User not found");
          return;
        }
        productRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };    
};

export default ProductController;
