import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleGoToLogin = () => {
        navigate('/login')
    }

    if (user && !user.auth) {
        return <>
            <Alert variant="danger" className='mt-3'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You need to log in to access the system
                </p>
            </Alert>

            <span className='goToLogin' onClick={() => handleGoToLogin()}> <i className="fa-solid fa-arrow-right"></i> Go to Login</span>
        </>
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes;