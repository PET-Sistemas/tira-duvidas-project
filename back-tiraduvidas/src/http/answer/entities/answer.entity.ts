import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnswerStatus } from '../enums/answer-status.enum';
import { Question } from 'src/http/question/entities/question.entity';
import { User } from 'src/http/user/entities/user.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'question_id' })
  questionId: number;

  @Column({ name: 'respondent_id' })
  respondentId: number;

  @Column({ name: 'auditor_id' })
  auditorId: number;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'enum', enum: AnswerStatus, name: 'status' })
  status?: AnswerStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'respondent_id' })
  respondent: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'auditor_id' })
  auditor: User;
}
