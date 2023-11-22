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
export interface IRevenue {
    incomeType: string
    storeId: number
    storeName: string
    bills: [{
        incomeTime: string
        income: number
        expense: number
        total: number
        incomeType: string
    }]
    total: {
        incomeTime: string
        income: number
        expense: number
        total: number
        incomeType: string
    }
}

