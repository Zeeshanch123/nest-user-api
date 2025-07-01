import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
//
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Users } from './user/entity/user.entity';
import { Products } from './product/entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make config accessible in all modules
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        synchronize: false, // ✅Set to false in production level for end user as for clients || use migrations in real world
        // synchronize: true, // Set to true in development level for developers;
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // it works
        // entities: [Users, Products], // it works
      }),
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
