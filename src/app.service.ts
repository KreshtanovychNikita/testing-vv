import {Injectable, OnModuleInit} from '@nestjs/common';
import * as process from "process";
import  TelegramBot  from 'node-telegram-bot-api';
import {InjectRepository} from "@nestjs/typeorm";
import {TelegramSessionEntity} from "./entities/telegram-session.entity";
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  private bot: TelegramBot;

  @InjectRepository(TelegramSessionEntity)
  private telegramSessionRepository: Repository<TelegramSessionEntity>;

  constructor() {
  }

  onModuleInit() {
    const TelegramBot = require('node-telegram-bot-api');
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = process.env.BACKEND_URL;
    const port = Number(process.env.TELEGRAM_PORT);

    this.bot = new TelegramBot(token, {
      webHook: {
        port: port,
      },
    });

    this.bot.setWebHook(`${url}/bot${token}`);

    this.bot.on('message', (msg) => {
      if (msg.text === 'test') {
        console.log(`Great ${msg.chat.id}`);
      }
    });

    this.bot.onText(/\/login/, async (msg) => {
      const chatId = msg.chat.id;
        try {
          await this.telegramSessionRepository
              .createQueryBuilder('telegram')
              .insert()
              .into(TelegramSessionEntity)
              .values({
                chat_id: chatId,
                user_id: 2,
                access_token: "test",
                role: "operator",
              })
              .execute();
          await this.bot.sendMessage(chatId,"Test OK")
        } catch (e) {
          console.error(e);
        }
      }
    )}
}
