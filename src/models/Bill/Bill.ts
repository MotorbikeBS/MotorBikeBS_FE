export interface IBill {
    billConfirmId: number;
    motorId: number;
    userId: number;
    storeId: number;
    price: number;
    status: string;
    createAt: Date;
}
