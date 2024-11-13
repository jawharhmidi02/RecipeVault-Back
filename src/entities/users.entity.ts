import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipes } from './recipes.entity';
import { RecipeLikes } from './recipeLikes.entity';

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

  @OneToMany(() => Recipes, (recipe) => recipe.user)
  recipes: Recipes[];

  @OneToMany(() => RecipeLikes, (like) => like.user)
  likes: RecipeLikes[];
}
