import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import { Button, Rating, TextareaAutosize } from '@mui/material';

interface ICommentProps {
    requestId: number;
    content: string;
    rating: number;
    replyId: number;
}

const CreateComment = () => {
    const form = useForm<ICommentProps>({
        defaultValues: {
            requestId: undefined,
            content: '',
            rating: undefined,
            replyId: undefined,
        },
    });

    const { control, handleSubmit, setValue } = form;

    const onSubmit = (data: ICommentProps) => {
        console.log(data);
    };

    return (
        <div>
            <form noValidate className="form-cmt">
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <Rating {...field} defaultValue={0} precision={1} />
                    )}
                />
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                        <TextareaAutosize
                            {...field}
                            placeholder="Viết bình luận ..."
                            style={{
                                width: '85%',
                                height: '60px',
                                resize: 'none',
                            }}
                        />
                    )}
                />
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                    <SendIcon />
                </Button>
            </form>
        </div>
    );
};

export default CreateComment;
