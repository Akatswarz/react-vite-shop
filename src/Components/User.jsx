import React from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
    const username = Cookies.get('username');
    const navigate = useNavigate();

    const Logout = (e) => {
        e.preventDefault();
        Cookies.remove('username');
        window.location.reload();
        navigate('/');
    }

    if (username) {
        return (
            <Link className="nav-icon position-relative text-decoration-none" to={'/login'} onClick={Logout}>
                <span>{Cookies.get('username')}</span>
                {/* <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span> */}
            </Link>
        )
    } else {
        return (
            <Link className="nav-icon position-relative text-decoration-none" to={'/login'}>
                <i className="fa fa-fw fa-user text-dark mr-3" />
            </Link>
        )
    }
}

export default User