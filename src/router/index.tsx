import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Register from '../pages/register-components/Register'
import LoginComponent from '../pages/login-component/LoginComponent'
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<LoginComponent />} />

            <Route path='/sign-up' element={<Register />} />
        </Routes>
    )
}

export default AppRoutes