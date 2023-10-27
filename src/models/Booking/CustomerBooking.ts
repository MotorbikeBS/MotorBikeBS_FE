import { IMotorImages, IMotorStatus } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IMotorbikeCustomerBooking {
    motorId: number;
    certificateNumber: string;
    registrationImage: string;
    motorName: string;
    odo: number;
    year: Date;
    price: number;
    description: string;
    motorStatus: IMotorStatus;
    motorbikeImages: IMotorImages[];
}
export interface IBuyerBooking {
    bookingId: number;
    requestId: number;
    dateCreate: Date;
    bookingDate: Date;
    note: string;
    status: string;
}

export interface ICustomerBookingField {
    motorId: number;
    bookingDate: Date;
    note: string;
}
export interface ICustomerBooking {
    requestId: number;
    motorId: number;
    receiverId: number;
    senderId: number;
    requestTypeId: number;
    status: string;
    motor: IMotorbikeCustomerBooking;
    buyerBookings: IBuyerBooking[];
    receiver: IUser;
    sender: IUser;
}
