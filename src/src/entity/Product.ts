import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Length } from "class-validator";
import {Order} from "./Order";

  @Entity()
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    name: string;
  
    @Column()
    price: number;
    
    @OneToMany(type => Order, order => order.product)
    orders: Order[];
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  