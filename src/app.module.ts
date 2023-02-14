import { Module } from '@nestjs/common';
import { CartsModule } from './handlers/carts/carts.module';
// import { ConfigModule } from './services/config/config.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { ProductsModule } from './handlers/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env.development',
        '.env.production',
        '.env',
      ],
    }),
    CartsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard,
    },
  ],
})
export class AppModule {}
