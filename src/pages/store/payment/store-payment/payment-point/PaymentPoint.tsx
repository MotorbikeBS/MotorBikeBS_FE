import {
    Box,
    Button,
    Container,
    TextField,
    Typography
} from '@mui/material';
import './css/_payment-point.scss';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../services/store/store';
import { paymentPointRequest } from '../../../../../services/features/payment/paymentSlice';
import { NumericFormat } from 'react-number-format';

interface ICreateRequestPayment {
    amount: number | null
    url: unknown | string | any
}

const PaymentPointComponent = () => {
    const dispatch = useAppDispatch()

    const form = useForm<ICreateRequestPayment>({
        defaultValues: {
            amount: null,
        },

    });

    const { paymentRequest } = useAppSelector((state) => state.payment)
    const url = paymentRequest

    const { register, handleSubmit, formState, control } = form;
    const { errors } = formState;

    const onSubmit = async (data: ICreateRequestPayment) => {
        try {
            await dispatch(paymentPointRequest(data))
            if (url) {
                window.open(`${url}`)
                // navigate(`${url}`)
            }
            console.log(data);

        } catch (error) {

        }
    }

    return (
        <Box display="flex" flexDirection="column" width="100%" flexGrow={12}>
            <Box flexGrow={12} display="flex">
                <Container>
                    <div className="background-payment-coin" style={{ textAlign: 'center' }}>
                        <img
                            src="https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/08/Banner-cong-thanh-toan-VNPAYQR.png"
                            alt="BackgroundImage"
                        />
                    </div>
                    <div className="payment-coin-header" style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Typography fontSize={30} fontWeight={700} color="primary">
                            Nạp BS-COINS
                        </Typography>
                    </div>
                    <div className="payment-coin-header" style={{ marginTop: '20px' }}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <TextField
                                size='small'
                                label="Nhập số tiền"
                                type="text"
                                {...register('amount', {
                                    required: 'Bạn chưa nhập số tiền',
                                })}
                                style={{ marginBottom: '20px' }}
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                            /> */}
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <NumericFormat
                                        label='Nhập số tiền'
                                        allowLeadingZeros
                                        thousandSeparator=","
                                        customInput={TextField}
                                        {...field}
                                    />
                                )}
                            />
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                                size="medium"
                                fullWidth
                            >
                                Nap tiền
                            </Button>
                        </form>

                        <div className="text-note">
                            <Typography color="red" >
                                * Lưu ý:
                            </Typography>
                            <Typography>1 BS-COIN = 1.000 VNĐ</Typography>
                        </div>
                    </div>
                </Container>
            </Box>

        </Box>
    );
};

export default PaymentPointComponent;
