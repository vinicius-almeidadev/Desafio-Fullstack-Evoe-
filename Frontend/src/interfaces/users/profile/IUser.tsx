export interface IUser {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    phoneNumber: string;
    birthDate: Date;
    password?: string;
    confirmPassword?: string;
}