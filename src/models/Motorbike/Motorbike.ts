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
    //id, modelName, motorTypeName này để show lại xe ======
    id: number;
    modelName?: string;
    motorTypeName?: string;
    // ===============================================
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
    registrationImage: string;
    motorbikeImages: IMotorImages[];
}

export interface IModel {
    modelId: number;
    modelName: string;
    description?: string;
    status: string;
    brand: IBrand;
}

export interface IModelTable extends IModel {
    id?: number;
}
export interface IBrand {
    brandId: number;
    brandName: string;
    description?: string;
    status: string;
    motorbikeModels: IModel[];
}

export interface IBrandTable extends IBrand {
    id?: number;
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

export interface IMotorTypeTable extends IMotorType {
    id?: number;
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

export interface IFilter extends IMotorbike {
    brandId?: number[];
    modelId?: number[];
    minPrice?: number;
    maxPrice?: number;
    motorTypeId?: number[];
}
