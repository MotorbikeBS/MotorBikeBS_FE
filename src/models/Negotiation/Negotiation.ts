import { IMotorImages, IMotorStatus, IMotorType } from '../Motorbike/Motorbike';
import { IStore } from '../Store/Store';
import { IUser } from '../User/UserInterface';

export interface INegotiationStore {
    motorId: number;
    storePrice: number;
    description: string;
}
export interface IChangePriceNegotiation {
    negotiationId: number;
    price: number;
}
export interface INegotiationOwner {
    motorId: number;
    ownerPrice: number;
    description: string;
}

export interface IMotorNegotiation {
    motorId: number;
    certificateNumber: string;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
    description?: string;
    motorStatusId: number;
    motorType: IMotorType;
    ownerId: number;
    motorStatus: IMotorStatus;
    registrationImage: string;
    motorbikeImages: IMotorImages[];
}
export interface INegotiationRequest {
    negotiationId: number;
    requestId: number;
    storePrice: number;
    ownerPrice: number;
    startTime: Date;
    endTime: Date;
    description: string;
    status: string;
    finalPrice: number;
}

export interface INegotiation {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    motor: IMotorNegotiation;
    negotiations: INegotiationRequest[];
    receiver: IUser;
    sender: IUser;
}
export interface ISelectRowNegotiation {
    id: number;
    motorName: string;
    images: string;
    certificateNumber: string;
    year: Date;
    price: number;
    storePrice: number;
    ownerPrice: number;
    storeName: string;
    ownerName: string;
    ownerPhone: string;
    storePhone: string;
    ownerAddress: string;
    storeAddress: string;
    negotiationStatus: string;
    motorStatus: string | number;
}
