import { UsersResponse } from './users.dto';
import { Forms } from 'src/entities/forms.entity';
export declare class FormsCreate {
    full_name: string;
    email: string;
    telephone: string;
    description: string;
}
export declare class FormsResponse {
    id: string;
    user: UsersResponse;
    full_name: string;
    email: string;
    telephone: string;
    description: string;
    cv_pdf: string;
    constructor(forms: Forms);
}
