import { IMotorImages, IMotorStatus } from '../Motorbike/Motorbike';
import { IStore } from '../Store/Store';
import { IUser } from '../User/UserInterface';

export interface INegotiationStore {
    motorId: number;
    storePrice: number;
    description: string;
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
    motorTypeId: number;
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
