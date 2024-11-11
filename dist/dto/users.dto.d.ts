import { Users } from 'src/entities/users.entity';
export declare class UsersCreate {
    full_name: string;
    email: string;
    password: string;
    phone: string;
}
export declare class UsersUpdate {
    full_name: string;
    email: string;
    password: string;
    phone: string;
    dialogues: string[];
    role: string;
    nonce: string;
}
export declare class UsersResponse {
    id: string;
    full_name: string;
    email: string;
    password: string;
    phone: string;
    dialogues: string[];
    role: string;
    nonce: string;
    constructor(user: Users);
}
