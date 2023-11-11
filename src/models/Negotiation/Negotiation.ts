import { IMotorStatus, IMotorType } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IFieldNegoInfor {
    valuationId: number;
    finalPrice: number;
    content: string;
    startTime: Date;
    endTime: Date;
    deposit: number;
}
export interface IFieldNegoInforUpate {
    negotiationId: number;
    finalPrice: number;
    content: string;
    startTime: Date;
    endTime: Date;
    deposit: number;
}
export interface IMotorImgNeogtiation {
    imageId: number;
    imageLink: string;
    motorId: number;
}
export interface IMotorNegotiation {
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
    motorbikeImages: IMotorImgNeogtiation[];
}
export interface INegotiations {
    negotiationId: number;
    motorId: number;
    finalPrice: number;
    storeId: number;
    content: string;
    createdAt: Date;
    status: string;
    valuationId: number;
    baseRequestId: number;
    startTime: Date;
    endTime: Date;
    deposit: number;
}

export interface IValuationNegotiation {
    valuationId: number;
    requestId: number;
    storePrice: number;
    description: string;
    status: string;
    negotiations: INegotiations[];
}

export interface INegotiation {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;
    motor: IMotorNegotiation;
    valuations: IValuationNegotiation[];
    receiver: IUser;
    sender: IUser;
}
