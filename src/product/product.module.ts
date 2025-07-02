import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/product.entity';
import { Users } from '../user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Products, Users])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
