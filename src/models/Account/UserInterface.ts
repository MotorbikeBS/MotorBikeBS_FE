export interface IUser {
    userId: number;
    userName: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    phone: string;
    gender: number;
    dob: Date;
    idCard: string;
    address: string;
    localId: number;
    roleId: number;
    userVerifyAt: Date;
    userUpdatedAt: Date;
    status: string;
}
export interface ISignup {
    password: string;
    passwordConfirmed: string;
}
