import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from 'src/http/role/role.enum';
import { Category } from 'src/http/category/entities/category.entity';

@Entity({ name: 'user_roles' })
@Index(['userId', 'role'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'enum', enum: RoleEnum, name: 'role' })
  role: RoleEnum;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
