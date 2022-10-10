import { Test } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsModule } from '../products.module';
import * as dataMock from '../data/products.json';

describe('ProductsModule', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    }).compile();

    await module.init();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('ProductsController', () => {
    describe('getAllProducts', () => {
      it('should return all products', async () => {
        expect(controller.getAllProducts()).toEqual(dataMock);
      });
    });

    describe('getById', () => {
      it('should return a product by given Id', async () => {
        expect(
          controller.getById({ id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3' }),
        ).toEqual({
          product: {
            count: 7,
            description: 'Short Product Description2',
            id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
            price: 23,
            title: 'Product',
          },
        });
      });
    });
  });
});
