import {
    Box,
    Button,
    Paper,
    Rating,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';

interface IReplyCommentProps {
    requestId: number;
    content: string;
    rating: number;
    replyId: number;
}

const CommentForStoreComponent = () => {
    const form = useForm<IReplyCommentProps>({
        defaultValues: {
            requestId: undefined,
            content: '',
            rating: undefined,
            replyId: undefined,
        },
    });

    const { control, handleSubmit, setValue } = form;

    const onSubmit = (data: IReplyCommentProps) => {
        console.log(data);
    };
    return (
        <>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h5">Bình luận</Typography>
                <hr />
                {/* <Box>
                    <form noValidate className="form-cmt">
                        <Controller
                            name="rating"
                            control={control}
                            render={({ field }) => (
                                <Rating
                                    {...field}
                                    defaultValue={0}
                                    precision={1}
                                />
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
                </Box> */}
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    paddingY: 2,
                    paddingX: 4,
                    marginBottom: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box className="cmt-box">
                    <Box className="user-date">
                        <Typography className="user-date-name">
                            Minh Trí
                        </Typography>
                        <Typography sx={{ color: '#ccc' }}>
                            Đã chỉnh sửa
                        </Typography>
                        <Typography variant="subtitle1">14-11-2023</Typography>
                    </Box>
                    <Box className="info-cmt">
                        <Rating readOnly defaultValue={4.5} precision={0.5} />
                        <Typography>Xe đẹp đó.</Typography>
                        <Typography>Thông tin request</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined">Trả lời</Button>
                </Box>
            </Paper>
        </>
    );
};

export default CommentForStoreComponent;
