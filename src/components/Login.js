import { useState } from 'react'
import './Login.scss'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState('')

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required!')
            return;
        } else {
            let res = await loginApi(email, password)
            if (res && res.token) {
                localStorage.setItem('token', res.token)
            }
            console.log('check res : ', res);
        }
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
            />
            <div className='input-2'>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={isShowPassword === true ? 'text' : 'password'}
                    placeholder='Password'
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
                Login
            </button>
            <div className='goBack'>
                <i className='fa-solid fa-angles-left'></i> Go back
            </div>
        </div>
    )
}

export default Login