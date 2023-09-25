/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Add.css';

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

const Signup = () => {
    const navigate = useNavigate();

    // สร้าง state เพื่อเก็บข้อมูลผู้ใช้
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false); // เพิ่ม state สำหรับการแจ้งเตือนการลงทะเบียนสำเร็จ

    // ฟังก์ชันเมื่อข้อมูลผู้ใช้เปลี่ยนแปลง
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${URL}/register`, user, config);
            console.log('ลงทะเบียนสำเร็จ:', response.data);
            setRegistrationSuccess(true);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h2 className="text-center">Register</h2>
            {registrationSuccess && ( // แสดงข้อความเมื่อลงทะเบียนสำเร็จ
                <div className="alert alert-success form-label" role="alert">
                    ลงทะเบียนสำเร็จ!
                </div>
            )}
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
                </div>
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
