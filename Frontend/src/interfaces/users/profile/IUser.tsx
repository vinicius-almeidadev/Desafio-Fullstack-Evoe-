export interface IUser {
    id?: string;
    name: string;
    cpf: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    password?: string;
    confirmPassword?: string;
}