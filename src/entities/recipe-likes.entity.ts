import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Recipes } from './recipes.entity';

@Entity()
export class RecipeLikes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE' })
  user: Users;

  @ManyToOne(() => Recipes, (recipe) => recipe.id, { onDelete: 'CASCADE' })
  recipe: Recipes;
}
