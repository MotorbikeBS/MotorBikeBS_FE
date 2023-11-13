export interface IPaymentRequest {
    amount: number;
    // result: string | any | unknown;
    // response: string | null | any;
}
export interface IFieldPayment {
    paymentId: number;
    requestId: number;
    content: string;
    dateCreated: Date;
    paymentTime: Date;
    vnpayOrderId: string;
    paymentType: string;
    amount: number;
    point: number;
}
export interface IPaymentHistory {
    requestId: number;
    motorId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;

    payments: IFieldPayment[];
}
