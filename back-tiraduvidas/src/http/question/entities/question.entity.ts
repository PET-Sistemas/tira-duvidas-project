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

  @Column({ name: 'moderator_id' })
  moderatorId: number;

  @Column({ type: 'enum', enum: QuestionStatus })
  status: QuestionStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'questioner_id' })
  questioner: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'moderator_id' })
  moderator: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
