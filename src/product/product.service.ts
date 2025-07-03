import { Injectable, NotFoundException, BadGatewayException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Products } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Users } from '../user/entity/user.entity';
import { customResponseHandler } from 'src/config/helpers';
import { NormalResponse } from 'src/interface/interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productRepo: Repository<Products>,

        @InjectRepository(Users)
        private userRepo: Repository<Users>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<NormalResponse<Products>> {
        try {
            const user = await this.userRepo.findOneBy({ id: createProductDto.created_by });
            if (!user) throw new NotFoundException('User not found');

            const product = this.productRepo.create({ ...createProductDto, created_by: user });
            const savedProduct = await this.productRepo.save(product);
            savedProduct.price = Number(Number(savedProduct.price).toFixed(2));
            return customResponseHandler(savedProduct, 'Product created successfully');
        } catch (err) {
            throw new BadGatewayException(err.message);
        }
    }

    async findAll(): Promise<NormalResponse<Products[]>> {
        try {
            const products = await this.productRepo.find({ relations: ['created_by'] });
            return customResponseHandler(products, 'Fetched products successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findOne(id: string): Promise<NormalResponse<Products>> {
        try {
            const product = await this.productRepo.findOne({ where: { id }, relations: ['created_by'] });
            if (!product) throw new NotFoundException('Product not found');
            return customResponseHandler(product, 'Fetched product successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async update(id: string, updateDto: UpdateProductDto): Promise<NormalResponse<Products | null>> {
        try {
            const updateResult = await this.productRepo.update(id, updateDto);
            if (updateResult.affected === 0) {
                throw new NotFoundException('Product not found');
            }
            const updatedProduct = await this.productRepo.findOne({ where: { id }, relations: ['created_by'] });
            return customResponseHandler(updatedProduct, 'Product updated successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async remove(id: string): Promise<NormalResponse<null>> {
        try {
            const product = await this.productRepo.findOne({ where: { id }, relations: ['created_by'] });
            if (!product) throw new NotFoundException('Product not found');
            await this.productRepo.remove(product);
            return customResponseHandler(null, 'Product removed successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
