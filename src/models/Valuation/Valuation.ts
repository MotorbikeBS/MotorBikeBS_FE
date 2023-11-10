import { IMotorStatus, IMotorType } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IFieldRequest {
    motorId: number;
    storePrice: number;
    description: string;
}

export interface IMotorImgValuation {
    imageId: number;
    imageLink: string;
    motorId: number;
}
export interface IMotorValuation {
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
    motorbikeImages: IMotorImgValuation[];
}
export interface IValuationRequest {
    valuationId: number;
    requestId: number;
    storePrice: number;
    description: string;
    status: string;
}

export interface IValuation {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;
    motor: IMotorValuation;
    valuations: IValuationRequest[];
    receiver: IUser;
    sender: IUser;
}
export interface ISelectRowValuation {
    id: number;
    motorName: string;
    images: string;
    certificateNumber: string;
    year: Date;
    price: number;
    storePrice: number;
    storeName: string;
    ownerName: string;
    ownerPhone: string;
    storePhone: string;
    ownerAddress: string;
    storeAddress: string;
    noteValuation: string;
    valuationStatus: string;
    motorStatus: string | number;
}
