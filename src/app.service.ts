import {Injectable, OnModuleInit} from '@nestjs/common';
import * as process from "process";
import  TelegramBot  from 'node-telegram-bot-api';
import {InjectRepository} from "@nestjs/typeorm";
import {TelegramSessionEntity} from "./entities/telegram-session.entity";
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
      @InjectModel('TelegramSessionEntity')
      private readonly telegramSessionModel: Model<TelegramSessionEntity>,
  ) {}

  onModuleInit() {
    const TelegramBot = require('node-telegram-bot-api');
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const url = process.env.BACKEND_URL;
    const port = Number(process.env.TELEGRAM_PORT);

    this.bot = new TelegramBot(token, {
      polling: true,
    });

    this.bot.setWebHook(`${url}/bot${token}`);


    this.bot.on('message', (msg) => {
      if (msg.text === 'test') {
        console.log(`Great ${msg.chat.id}`);
        this.bot.sendMessage(msg.chat.id,"hello")
      }
    });

    this.bot.onText(/\/login/, async (msg) => {
      const chatId = msg.chat.id;
        try {
          const newUser = new this.telegramSessionModel({
            chat_id: chatId,
            user_id: 2,
            access_token: "test",
            role: "operator",
          });
          await newUser.save();
          await this.bot.sendMessage(chatId, "Test OK");
        } catch (e) {
          console.error(e);
        }
      }
    )

  }
  async processNotification(message, sab) {
    this.bot.sendMessage(395059873, `${sab}`)
  }
}
