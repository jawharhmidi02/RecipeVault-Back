import { Users } from 'src/entities/users.entity';
import { UsersResponse } from './users.dto';
import { Forms } from 'src/entities/forms.entity';
import { IsString } from 'class-validator';

export class FormsCreate {
  @IsString()
  full_name: string;

  @IsString()
  email: string;

  @IsString()
  telephone: string;

  @IsString()
  description: string;
}

export class FormsResponse {
  id: string;
  user: UsersResponse;
  full_name: string;
  email: string;
  telephone: string;
  description: string;
  cv_pdf: string;

  constructor(forms: Forms) {
    this.user = new UsersResponse(forms.user);
    this.id = forms.id;
    this.full_name = forms.full_name;
    this.email = forms.email;
    this.telephone = forms.telephone;
    this.description = forms.description;
    this.cv_pdf = forms.cv_pdf;
  }
}
