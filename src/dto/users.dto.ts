import { Users } from 'src/entities/users.entity';
import { Recipes } from 'src/entities/recipes.entity';
import { RecipeLikes } from 'src/entities/recipe-likes.entity';
import { IsString, IsArray } from 'class-validator';

export class UsersCreate {
  @IsString()
  full_name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;
}

export class UsersUpdate {
  @IsString()
  full_name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsArray()
  dialogues: string[];

  @IsString()
  role: string;

  @IsString()
  nonce: string;

  @IsArray()
  recipes: Recipes[];

  @IsArray()
  likes: RecipeLikes[];
}

export class UsersResponse {
  id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  dialogues: string[];
  role: string;
  nonce: string;
  recipes: Recipes[];
  likes: RecipeLikes[];

  constructor(user: Users) {
    this.dialogues = user.dialogues;
    this.email = user.email;
    this.id = user.id;
    this.full_name = user.full_name;
    this.phone = user.phone;
    this.role = user.role;
    this.nonce = user.nonce;
    this.recipes = user.recipes;
    this.likes = user.likes;
  }
}

export class UserProfileResponse {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  recipes: Recipes[];
  likes: RecipeLikes[];

  constructor(user: Users) {
    this.email = user.email;
    this.id = user.id;
    this.full_name = user.full_name;
    this.phone = user.phone;
    this.role = user.role;
    this.recipes = user.recipes;
    this.likes = user.likes;
  }
}
