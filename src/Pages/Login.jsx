import React, { useState } from 'react';
import '../assets/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { getAPI } from '../Components/API';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        getAPI({
            method: "POST",
            url: 'https://dummyjson.com/user/login',
            data: { username: username, password: password },
        })
            .then(data => {
                if (data) {
                    Cookies.set('token', data.accessToken, { expires: 1, path: '/' });
                    Cookies.set('username', data.username, { expires: 1, path: '/' });
                    if(!Cookies.get(`cart_${username}`))
                        Cookies.set(`cart_${username}`,JSON.stringify([]))
                    navigate('/');
                    window.location.reload();
                } else {
                    toast.error('Đăng nhập thất bại',{
                        position: 'bottom-center',
                        autoClose: 300,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        theme: 'dark'
                    })
                    setUsername(username);
                    setPassword("");
                }
            })
            .catch(e => console.error(e))
    };

    return (
        <>
            <div className="container-fuild">
                <div className='d-flex bg-success justify-content-center'>
                    <Link to={'/'} className='text-decoration-none text-black my-2'><h1 className='text-light'>HOME</h1></Link>
                </div>
                <div className="App mt-5">
                    <h1>Login</h1>
                    <form onSubmit={submit} className="form__container">
                        <div className="form__controls">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__controls">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form__controls">
                            <button className="button me-1">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
