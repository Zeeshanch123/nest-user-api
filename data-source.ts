import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Users } from './src/user/entity/user.entity';
import { Products } from './src/product/entity/product.entity';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: [Users, Products],
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/src/migrations/*{.js,.ts}'],
    synchronize: false,
});
