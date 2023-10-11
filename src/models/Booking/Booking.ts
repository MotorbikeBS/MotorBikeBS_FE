import { IMotorbike } from '../Motorbike/Motorbike';
import { IStore } from '../Store/Store';

export interface IBooking {
    bookingId: number;
    requestId: number;
    dateCreate: Date;
    bookingDate: Date;
    note: string;
    status: string;
}

export interface IBookingResponse {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    requestTypeId: number;
    status: string;
    motor: IMotorbike;
    bookings: IBooking[];
    sender: IStore;
}

export interface IBookingOwnerExchange {
    motorId: number;
    bookingDate: Date;
    note: string;
}
