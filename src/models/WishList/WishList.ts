import { IMotorbike } from '../Motorbike/Motorbike';

export interface IWishList {
    wishlistId: number;
    userId: number;
    motorId: number;
    motor: IMotorbike;
}
