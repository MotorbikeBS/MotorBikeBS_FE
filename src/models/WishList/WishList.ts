import { IMotorbike } from '../Motorbike/Motorbike';

export interface IWishList {
    userId: number;
    motorId: number;
    motor: IMotorbike;
}
