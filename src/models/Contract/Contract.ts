import { IMotorStatus } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IMotorbikeContract {
    motorId: number;
    certificateNumber: number;
    registrationImage: File;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
    description: string;
    motorStatus: IMotorStatus;
    motorType: number;
    storeId: number;
    motorbikeImages: IMotorbikeImagesContract[];
}
export interface IMotorbikeImagesContract {
    imageId: number;
    imageLink: string;
    motorId: number;
}
export interface IBookingContractImage {
    contractImageId: number;
    contractId: number;
    imageLink: string;
    description: string;
}
export interface IBookingContract {
    contractId: number;
    motorId: number;
    price: number;
    newOwner: number;
    storeId: number;
    content: string;
    createdAt: Date;
    status: string;
    bookingId: number;
    baseRequestId: number;
    contractImages: IBookingContractImage[];
}
export interface IBookingNegotiationContract {
    bookingId: number;
    dateCreate: Date;
    bookingDate: Date;
    note: string;
    status: string;
    contracts: IBookingContract[];
}

export interface INegotiationContract {
    negotiationId: number;
    requestId: number;
    storePrice: number;
    ownerPrice: number;
    startTime: Date;
    endTime: Date;
    description: string;
    status: string;
    finalPrice: number;
    baseRequestId: number;
    expiredTime: Date;
    lastChangeUserId: number;
    bookings: IBookingNegotiationContract[];
}
export interface ICreateContract {
    content: string;
    images: File[];
}

export interface IContract {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    requestTypeId: number;
    status: string;
    motor: IMotorbikeContract;
    negotiations: INegotiationContract[];
    receiver: IUser;
    sender: IUser;
}
