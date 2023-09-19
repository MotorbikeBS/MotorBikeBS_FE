import React, { useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import './style/style.scss'
import PageNotFound from '../../page-notfound/PageNotFound'
import { Link } from 'react-router-dom'
const VerifyAccount = () => {
    const [validUrl, setValidUrl] = useState(false)
    return (
        <div>
            {validUrl ? (
                <Container>
                    <div>
                        <Typography>Verify Successfully</Typography>
                    </div>
                    <img src='../../../../public/Successfully.png' alt='Success_Verify' />
                    <Link to='/login'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </Container>
            ) : (
                <Typography>
                    <PageNotFound />
                </Typography>
            )}
        </div>
    )
}

export default VerifyAccount