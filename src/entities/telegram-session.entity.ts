import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'telegram-session-entity' })
@Index('idx_id_tg', ['id'])
export class TelegramSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  chat_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  access_token: string;

  @Column()
  role: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
