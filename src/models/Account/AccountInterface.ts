export interface IAccount {
    userId: number;
    userName: string;
    email: string;
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

export interface IRegisterStore {
    storeName: string;
    taxCode: string;
    storePhone: string;
    storeEmail: string;
    address: string;
    file: File;
}
export interface IRegisterOwner {
    phone: string;
    idCard: string;
    address: string;
}
