import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import { Button, Rating, TextareaAutosize } from '@mui/material';
import { useAppDispatch } from '../../services/store/store';
import { createComment } from '../../services/features/comment/commentSlice.';
import { toast } from 'react-toastify';

interface ICommentProps {
    content: string;
    rating: number;
}

interface createCommentProps {
    requestId: string;
    handleClearRequestTitle: () => void;
    loadData: () => void;
}

const CreateComment: React.FC<createCommentProps> = ({
    requestId,
    handleClearRequestTitle,
    loadData,
}) => {
    const dispatch = useAppDispatch();

    const form = useForm<ICommentProps>({
        defaultValues: {
            content: '',
            rating: 0,
        },
    });

    const { control, handleSubmit, formState } = form;
    const { isDirty } = formState;

    const onSubmit = (data: ICommentProps) => {
        dispatch(createComment({ requestId: Number(requestId), data }))
            .unwrap()
            .then(() => {
                loadData();
                handleClearRequestTitle();
                toast.success('Bình luận thành công.');
            })
            .catch((error) => {
            });
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
                <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isDirty}
                >
                    <SendIcon />
                </Button>
            </form>
        </div>
    );
};

export default CreateComment;
