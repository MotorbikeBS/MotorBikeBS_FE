export interface INotify {
    notificationId: number;
    requestId: number;
    userId: number;
    title: string;
    content: string;
    notificationTypeId: number;
    time: Date;
    isRead: boolean;
    notificationType: {
        notificationTypeId: number;
        title: string;
        notifications: [];
    };
}
