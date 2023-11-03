/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add.css';
import AuthService from '../services/auth.services';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ message: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleCancel = () => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการยกเลิกการลงทะเบียนหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ยกเลิก',
            cancelButtonText: 'ไม่, ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        });
    };

    const handleRegister = async () => {
        try {
            if (user.confirmPassword === user.password) {
                const register = await AuthService.register(user.username, user.email, user.confirmPassword);
                console.log('ลงทะเบียนสำเร็จ:', register);
                await Swal.fire({
                    icon: 'success',
                    title: 'ลงทะเบียนสำเร็จ',
                    text: 'คุณได้ลงทะเบียนสำเร็จแล้ว',
                });
                navigate("/Login");
            } else {
                setError(true);
                setErrorMessage({ message: "รหัสผ่านไม่ตรงกัน!" });
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);
            setError(true);
            setErrorMessage(error.response.data);
            await Swal.fire({
                icon: 'error',
                title: 'ข้อผิดพลาดในการลงทะเบียน',
                text: 'เกิดข้อผิดพลาดในการลงทะเบียน',
            });
        }
    };

    return (
        <div>
            <h2 className="text-center">Signup</h2>
            <form className="container-sm">
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
                    <label htmlFor="email" className="form-label">
                        อีเมล:
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={user.email}
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        ยืนยันรหัสผ่าน:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage.message}
                    </div>
                )}
                <div className="d-grid gap-2">
                    <button
                        type="button"
                        className="btn btn-success form-control"
                        onClick={handleRegister}
                    >
                        ลงทะเบียน
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

export default Signup;
