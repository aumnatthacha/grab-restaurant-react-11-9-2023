/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.services'; //10
import { useAuthContext } from '../context/AuthContext'; //10



const NavBar = () => {
    // const [user, setUser] = useState(AuthService.getCurrentUser);
    const { user, logout } = useAuthContext(); //10
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-md">
                <Link className="navbar-brand" to="">
                    <img src="https://cdn-icons-png.flaticon.com/512/5433/5433293.png?ga=GA1.1.144658777.1694708375"
                        style={{ width: '50px', height: 'auto' }}
                    />

                </Link>
                <form>
                    {user && (
                        <button className="btn btn-outline-warning NotoSansThai-Regular">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </button>
                    )}{' '}
                    {/* 16 */}
                    {user && user.roles.includes("ROLES_ADMIN") && (
                        <button className="btn btn-outline-warning NotoSansThai-Regular">
                            <Link className="nav-link" to="/add">Add</Link>
                        </button>
                    )}{' '}

                    {!user && (
                        <button className="btn btn-outline-warning NotoSansThai-Regular">
                            <Link className="nav-link" to="/Signup">Signup</Link>
                        </button>
                    )}{' '}
                    {!user && (
                        <button className="btn btn-outline-warning NotoSansThai-Regular">
                            <Link className="nav-link" to="/Login">Login</Link>
                        </button>
                    )}
                    {user && (
                        <button className="btn btn-outline-warning NotoSansThai-Regular"
                            onClick={handleLogout}>Logout
                        </button>
                    )}
                    {user && (
                        <div className="navbar-text NotoSansThai-Regular">
                            ยินดีต้อนรับ, {user.username}
                        </div>
                    )}
                </form>
            </div>
        </nav>
    );
};

export default NavBar