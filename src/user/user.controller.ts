import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entity/user.entity';
import { NormalResponse } from 'src/interface/interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<NormalResponse<Users>> {
        return await this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<NormalResponse<Users[]>> {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<NormalResponse<Users>> {
        return await this.userService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<NormalResponse<Users | null>> {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<NormalResponse<null>> {
        return await this.userService.remove(id);
    }
}