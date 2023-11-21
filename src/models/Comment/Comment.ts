import { IMotorbike } from '../Motorbike/Motorbike';
import { IUser } from '../User/UserInterface';

export interface IComment {
    commentId: number;
    requestId: number;
    userId: number;
    content: string;
    rating: number;
    createAt: Date;
    updateAt: Date;
    status: string;
    replyId: number;
    inverseReply: [
        {
            commentId: number;
            userId: number;
            content: string;
            rating: number;
            createAt: Date;
            updateAt: Date;
            status: string;
        },
    ];
    request: {
        requestId: number;
        motorId: number;
        motor: IMotorbike;
        receiverId: number;
        senderId: number;
        time: Date;
        requestTypeId: number;
        status: string;
        requestType: {
            title: string;
            description: string;
        };
        receiver: IUser;
        sender: IUser;
    };
}

export interface IAverStarAndCmt {
    averageRating: number
    totalComment: number
}
