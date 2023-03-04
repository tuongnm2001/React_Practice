import { useContext, useEffect, useRef, useState } from 'react'
import './Login.scss'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { hanleLoginRedux } from '../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState('')
    const [loadingApi, setLoadingApi] = useState(false)
    const navigate = useNavigate();
    const passwordRef = useRef()
    const dispath = useDispatch();

    const isLoading = useSelector(state => state.user.isLoading)
    const account = useSelector(state => state.user.account)

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!')
            return;
        }
        dispath(hanleLoginRedux(email, password))


    }

    const handleGoBack = () => {
        navigate('/')
    }

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')
        }
    }, [account])

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
                Login {isLoading && <i className='fa-solid fa-circle-notch fa-spin'></i>}
            </button>
            <div className='goBack'>
                <i className='fa-solid fa-angles-left'></i>
                <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
            </div>
        </div>
    )
}

export default Login