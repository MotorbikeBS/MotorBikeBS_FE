import { IMotorImages, IMotorStatus } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IMotorbikeBookingByStore {
    motorId: number;
    certificateNumber: string;
    registrationImage: string;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
    owner: IUser;
    motorStatus: IMotorStatus;
    motorbikeImages: IMotorImages[];
}
export interface INegotiation {
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
    lastChangeUserId: number;
    bookings: IBookingRequestByStore[];
}
export interface IBookingRequestByStore {
    bookingId: number;
    dateCreate: Date;
    bookingDate: Date;
    note: string;
    status: string;
}

export interface IBookingFieldByStore {
    negotiationId: number;
    bookingDate: Date;
    note: string;
}

export interface IBookingByStore {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    requestTypeId: number;
    status: string;
    motor: IMotorbikeBookingByStore;
    negotiations: INegotiation[];
    receiver: IUser;
    sender: IUser;
}
