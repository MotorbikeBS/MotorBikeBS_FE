import { IStore } from '../Store/Store';

export interface IMotorbike {
    motorId: number;
    certificateNumber: string;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
    description?: string;
    model: IModel;
    motorStatus: IMotorStatus;
    motorType: IMotorType;
    store: IStore;
    storeId: number;
    owner: {
        userName: string;
        phone: string;
        gender: number;
        dob: Date;
        idCard: string;
        address: string;
    };
    motorbikeImages: IMotorImages[];
}

export interface IModel {
    modelId: number;
    modelName: string;
    description?: string;
    status: string;
    brand: IBrand;
}
export interface IBrand {
    brandId: number;
    brandName: string;
    description?: string;
    status: string;
}

export interface IMotorStatus {
    motorStatusId: number;
    title: string;
    description?: string;
}

export interface IMotorType {
    motorTypeId: number;
    title: string;
    description?: string;
    status: string;
}

export interface IMotorImages {
    imageId: number;
    imageLink: string;
    motorId: number;
}

export interface IMotorbikeDetail {
    motorId: number;
    certificateNumber: string;
    motorName: string;
    odo: number;
    year: Date;
    price: 12333;
    description?: string;
    model: IModel;
    motorStatus: IMotorStatus;
    motorType: IMotorType;
    storeId: number;
    store: IStore;
    owner: {
        userId: number;
        userName: string;
        email: string;
        phone: string;
        gender: number;
        dob: Date;
        idCard: string;
        address: string;
        localId?: string;
        roleId: number;
        userVerifyAt: Date;
        userUpdatedAt: Date;
        status: string;
        role: {
            roleId: number;
            title: string;
        };
    };
    motorbikeImages: IMotorImages[];
}
