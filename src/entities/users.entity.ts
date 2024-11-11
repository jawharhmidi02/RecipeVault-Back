import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column('text', { array: true, default: [] })
  dialogues: string[];

  @Column({ default: 'client' })
  role: string;

  @Column({ nullable: true })
  nonce: string;
}
