import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TelegramSessionEntity extends Document {
  @Prop({ required: true })
  chat_id: number;

  @Prop({ required: true })
  user_id: number;

  @Prop({ required: true })
  access_token: string;

  @Prop({ required: true })
  role: string;
}

export const TelegramSessionSchema = SchemaFactory.createForClass(TelegramSessionEntity);
