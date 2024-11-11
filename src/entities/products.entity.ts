import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './categories.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column({ type: 'text', array: true, default: [] })
  description: string[];

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'SET NULL',
  })
  category: Category;
}
