import { useContext, useEffect, useRef, useState } from 'react'
import './Login.scss'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext)
    const passwordRef = useRef()

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!')
            return;
        }
        setLoadingApi(true)

        let res = await loginApi(email.trim(), password)
        if (res && res.token) {
            loginContext(email, res.token)
            navigate('/')
            toast.success('Login success!')
        } else {
            //error
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoadingApi(false)
    }

    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text-email-username'>Email or Username</div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type={'text'}
                placeholder='Email or Username'
                onKeyUp={event => {
                    if (event.key === 'Enter') {
                        passwordRef.current.focus();
                    }
                }}

            />
            <div className='input-2'>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Password'
                    ref={passwordRef}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            handleLogin();
                        }
                    }}
                />
                <i
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}

                ></i>
            </div>

            <button
                className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >
                Login {loadingApi && <i className='fa-solid fa-circle-notch fa-spin'></i>}
            </button>
            <div className='goBack'>
                <i className='fa-solid fa-angles-left'></i>
                <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
            </div>
        </div>
    )
}

export default Login