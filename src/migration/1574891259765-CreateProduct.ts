import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Product } from "../entity/Product";

export class CreateProduct1574891259765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let product = new Product();
          product.name = "bonbon sucré n 1";
          product.price = 12;
          product.name = "bonbon sucré n 2";
          product.price = 14;
          product.name = "bonbon sucré n 3";
          product.price = 20;                    
        const productRepository = getRepository(Product);
        await productRepository.save(product);
      }
    
      public async down(queryRunner: QueryRunner): Promise<any> {}
}
