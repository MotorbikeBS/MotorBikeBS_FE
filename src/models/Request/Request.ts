import { IMotorbike } from "../Motorbike/Motorbike";
import { IUser } from "../User/UserInterface";

export interface IRequest {
    requestId: number,
    motorId: number,
    motor: IMotorbike,
    receiverId: number,
    receiver: IUser,
    senderId: number,
    sender: IUser,
    time: Date,
    requestTypeId: number,
    requestType: {
        title: string,
        description: string,
    },
    status: string
}