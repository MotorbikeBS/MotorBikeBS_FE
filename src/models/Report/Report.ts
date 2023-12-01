import { IUser } from '../User/UserInterface';
export interface ISelectRowReportStore {
    id: number;
    imageReport: string;
    title: string;
    description: string;
    reportStore: string;
    storePhone: string;
    sender: string;
}
export interface IReportImage {
    reportImageId: number;
    reportId: number;
    imageLink: string;
}
export interface IReportField {
    reportId: number;
    requestId: number;
    description: string;
    title: string;
    status: string;
    reportImages: IReportImage[];
}
export interface IReport {
    requestId: number;
    receiverId: number;
    senderId: number;
    time: Date;
    requestTypeId: number;
    status: string;
    reports: IReportField[];
    receiver: IUser;
    sender: IUser;
}
export interface ICreateReport {
    storeId: number;
    description: string;
    title: string;
    images: FileList;
}
