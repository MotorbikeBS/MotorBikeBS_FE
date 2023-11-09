import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './../payment-error/style/_style.scss'

const PaymentSucessfullyComponent = () => {
    return (
        <Container>
            <div className="container">
                <div className="success-message">
                    <Typography variant='h3' color='green'>Nạp điểm thành công</Typography>
                    <img
                        src={`${process.env.PUBLIC_URL}/Successfully.png`}
                        alt="Success_Verify"
                        className="verify-image"
                    />
                    <Link to="/" className="btn-container">
                        <Button className="login-button">Trở lại</Button>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default PaymentSucessfullyComponent