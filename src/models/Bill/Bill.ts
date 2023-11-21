import { IMotorbike } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IBill {
    billConfirmId: number;
    motorId: number;
    userId: number;
    storeId: number;
    price: number;
    status: string;
    createAt: Date;
    request: {
        motor: IMotorbike;
        receiver: IUser;
        sender: IUser;
    };
}
