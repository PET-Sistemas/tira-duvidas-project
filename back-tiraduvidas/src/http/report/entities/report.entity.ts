import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'respondent_name' })
  respondentName: string;

  @Column({ type: 'text', name: 'semester' })
  semester: string;

  @Column({ type: 'varchar', length: 14, name: 'respondent_cpf' })
  respondentCpf: string;

  @Column({ type: 'varchar', length: 255, name: 'respondent_email' })
  respondentEmail: string;

  @Column({ type: 'varchar', length: 20, name: 'respondent_phone' })
  respondentPhone: string;

  @Column({ type: 'int', name: 'total_answered_questions' })
  totalAnsweredQuestions: number;

  @Column({ type: 'int', name: 'workload_hours' })
  workloadHours: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;
}
