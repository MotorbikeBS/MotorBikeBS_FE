export interface ISelectRowNegotiation {
    id: number;
    motorName: string;
    images: string;
    certificateNumber: string;
    year: Date;
    startTime: Date;
    endTime: Date;
    price: number;
    storeName: string;
    ownerName: string;
    ownerPhone: string;
    storePhone: string;
    ownerAddress: string;
    storeAddress: string;
    noteNegotiation: string;
    negotiationStatus: string;
    motorStatus: string | number;
}
import { IMotorStatus, IMotorType } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

// }
export interface IMotorImgNego {
    imageId: number;
    imageLink: string;
    motorId: number;
}
export interface IMotorNego {
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
    motorbikeImages: IMotorImgNego[];
}
export interface INegoRequest {
    negotiationId: number;
    requestId: number;
    price: number;
    startTime: Date;
    endTime: Date;
    description: string;
    status: string;
    expiredTime: Date;
}
export interface IFieldRequest {
    motorId: number;
    price: number;
    startTime: Date;
    endTime: Date;
    description: string;
}
export interface INegotiation {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;
    motor: IMotorNego;
    negotiations: INegoRequest[];
    receiver: IUser;
    sender: IUser;
}
