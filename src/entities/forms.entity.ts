import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Users } from './users.entity';
@Entity()
export class Forms {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  description: string;

  @Column()
  cv_pdf: string;
}
