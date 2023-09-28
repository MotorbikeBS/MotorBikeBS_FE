export interface IUser {
    userId: number;
    userName: string;
    email: string;
    gender: number;
    phone?: string;
    address?: string;
    dob?: Date;
    idCard: string;
    roleId: number;
    role: {
        roleId: number;
        title: string;
    };
    roleTitle: string;
    status: string;
    userVerifyAt: Date;
    userUpdatedAt: Date;
}
