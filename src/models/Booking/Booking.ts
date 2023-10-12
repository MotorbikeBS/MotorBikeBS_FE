import { IStore } from '../Store/Store';

export interface IMotorBikeBooking {
    motorId: number;
    certificateNumber: string;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
}
export interface IBookingSelectRow {
    id: number;
    bookingId: number;
    motorName: string;
    certificateNumber: string;
    storeName: string;
    storePhone: string;
    address: string;
    bookingDate: Date;
    note: string;
    status: string;
}
export interface IBooking {
    requestId: number;
    bookingId: number;
    receiverId: number;
    senderId: number;
    requestTypeId: number;
    status: string;
    motor: IMotorBikeBooking;
    bookings: IBookingsRequest[];
    sender: IStore;
}

export interface IBookingsRequest {
    bookingId: number;
    requestId: number;
    dateCreate: Date;
    bookingDate: Date;
    note: string;
    status: string;
}

export interface IBookingOwnerExchange {
    motorId: number;
    bookingDate: Date;
    note: string;
}
