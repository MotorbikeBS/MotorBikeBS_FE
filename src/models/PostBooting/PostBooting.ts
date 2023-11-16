import { IMotorStatus, IMotorType } from '../Motorbike/Motorbike';

export interface IPostBootingField {
    motorId: number;
    startTime: Date;
    endTime: Date;
    level: number | string | any;
}
export interface IMotorImgPostBooting {
    imageId: number;
    imageLink: string;
    motorId: number;
}
export interface IMotorPostBooting {
    motorId: number;
    certificateNumber: number;
    motorName: string;
    modelId: number;
    odo: number;
    year: Date;
    price: number;
    description: string;
    motorStatusId: number;
    motorTypeId: number;
    storeId: number;
    ownerId: number;
    registrationImage: string;
    motorStatus: IMotorStatus;
    motorType: IMotorType;
    motorbikeImages: IMotorImgPostBooting[];
}
export interface IPostBootingData {
    boostId: number;
    startTime: Date;
    endTime: Date;
    level: number;
    historyId: number;
    status: string;
    pointDeducted: number;
}
export interface IPointHistory {
    pHistoryId: number;
    requestId: number;
    qty: number;
    pointUpdatedAt: Date;
    storeId: number;
    postBoostings: IPostBootingData[];
}
export interface IPostBooting {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;
    motor: IMotorPostBooting;
    pointHistories: IPointHistory[];
}
