import { Injectable, NotFoundException, BadGatewayException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { customResponseHandler } from 'src/config/helpers';
import { NormalResponse } from 'src/interface/interface';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<NormalResponse<Users>> {
        try {
            const newUser = this.userRepo.create(createUserDto);
            const savedUser = await this.userRepo.save(newUser);
            return customResponseHandler(savedUser, 'User created successfully');
        } catch (err) {
            if (err.code === '23505' || (err.message && err.message.includes('duplicate key value'))) {
                throw new BadRequestException('A user with this email already exists.');
            }
            throw new BadGatewayException('An unexpected error occurred while creating the user.');
        }
    }

    async findAll(): Promise<NormalResponse<Users[]>> {
        try {
            const users = await this.userRepo.find({ relations: ['products'] });
            return customResponseHandler(users, 'Fetched users successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findOne(id: string): Promise<NormalResponse<Users>> {
        try {
            const user = await this.userRepo.findOne({ where: { id }, relations: ['products'] });
            if (!user) throw new NotFoundException('User not found');
            return customResponseHandler(user, 'Fetched user successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<NormalResponse<Users | null>> {
        try {
            const updateResult = await this.userRepo.update(id, updateUserDto);
            if (updateResult.affected === 0) {
                throw new NotFoundException('User not found');
            }
            const user = await this.userRepo.findOne({ where: { id }, relations: ['products'] });
            return customResponseHandler(user, 'User updated successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async remove(id: string): Promise<NormalResponse<null>> {
        try {
            const user = await this.findOne(id);
            if (!user) throw new NotFoundException('User not found');
            await this.userRepo.remove(user.data);
            return customResponseHandler(null, 'User removed successfully');
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}