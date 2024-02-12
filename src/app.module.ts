import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as process from "process";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramSessionEntity, TelegramSessionSchema } from './entities/telegram-session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot("mongodb+srv://mykyta:Admin123@botcluster.t80iarh.mongodb.net/?retryWrites=true&w=majority"), // Підключення до MongoDB
    MongooseModule.forFeature([{ name: TelegramSessionEntity.name, schema: TelegramSessionSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
