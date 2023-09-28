export interface IUser {
    roleId: number;
    userId: number;
    roleName: string;
    userName: string;
    email: string;
    gender: number;
    phone?: string;
    address?: string;
    dob?: Date;
    idCard: string;
    userVerifyAt: Date;
    userUpdatedAt: Date;
}
