import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { array: true, default: [] })
  steps: string[];

  @Column('text', { nullable: true })
  description: string;

  @Column('text')
  ingredientsLocation: string;

  @Column('text')
  cuisineLocation: string;

  @Column('text', { default: '' })
  img: string;

  @Column('text', { array: true, default: [] })
  ingredients: string[];

  @Column({ default: false })
  is_approved: boolean;

  @Column({ default: false })
  is_rejected: boolean;

  @Column({ default: null, nullable: true })
  rejection_reason: string;

  @Column({ default: null, nullable: true, type: 'date' })
  approvedAt: Date;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column('text', { array: true, default: [] })
  utensils: string[];

  @Column('text')
  type: 'Starter' | 'Main' | 'Dessert' | 'Snack' | 'Breakfast' | 'Beverage';

  @Column('text')
  difficulty: 'Easy' | 'Medium' | 'Hard';

  @Column()
  prepTime: number;

  @Column()
  bakingTime: number;

  @Column()
  restingTime: number;
}
