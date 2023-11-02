/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Add.css'; 
import AuthService from '../services/auth.services';
//10
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuthContext();  
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const [loginSuccess, setLoginSuccess] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleLogin = async () => {
        try {
            const currentUser = await AuthService.login(user.username, user.password);
            login(currentUser);
            Swal.fire({
                icon: 'success',
                title: 'Successfully Login !',
                showConfirmButton: false,
                timer: 1500, // 
            });
    
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login failed !',
                text: error.message,
            });
        }
    };
    

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h2 className="text-center">Login</h2>
            <form className="container-sm">
                <div className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            ชื่อผู้ใช้:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            รหัสผ่าน:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success form-control"
                        onClick={handleLogin}
                    >
                        เข้าสู่ระบบ
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger form-control"
                        onClick={handleCancel}
                    >
                        ยกเลิก
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
