import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionStatus } from '../enums/question-status.enum';
import { Category } from 'src/http/category/entities/category.entity';
import { User } from 'src/http/user/entities/user.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ name: 'questioner_id' })
  questionerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'questioner_id' })
  questioner: User;

  @Column({ type: 'enum', enum: QuestionStatus, default: QuestionStatus.NOT_ANSWERED })
  status: QuestionStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories: Category[];
}
