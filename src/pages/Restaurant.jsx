/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthContext } from '../context/AuthContext';
import authHeader from '../services/auth-header';

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
    headers:authHeader(), 
};

const Restaurant = () => {
    const { user } = useAuthContext();
    const [restaurant, setRestaurant] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllRestaurant = async () => {
            try {
                const res = await axios.get(`${URL}/res`, config);
                setRestaurant(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllRestaurant();
    }, []);

    useEffect(() => {
        const filtered = restaurant.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRestaurant(filtered);
    }, [searchTerm, restaurant]);

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบร้านอาหารนี้?');

        if (shouldDelete) {
            try {
                await axios.delete(`${URL}/res/${id}`, config);
                const res = await axios.get(`${URL}/res`, config);
                setRestaurant(res.data);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการลบร้านอาหาร:', error);
            }
        }
    };

    return (
        <div className='row py-lg-5'>
            <h1 className='h1Restaurant'>THE RESTAURANT</h1>
            <div className="search-container">
                <div className="search-box">
                    <input
                        className="custom-search-input NotoSansThai-Regular"
                        type="text"
                        placeholder="ค้นหาเมนูเลย"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <ul className="restaurant-list row py-lg-5 ">
                {filteredRestaurant.map((item) => (
                    <li key={item.id} className="restaurant-card">
                        <div>
                            <img src={item.img} />
                            <h2>{item.name}</h2>
                            <p>{item.type}</p>
                            {/* 16 */}
                            <div className="button-container">
                                {user && user.roles.includes("ROLES_ADMIN") && (
                                    <button className="btn btn-outline-success" onClick={() => navigate('./update/' + item.id)}>
                                        <i className="bi bi-arrow-repeat"> </i>แก้ไข
                                    </button>

                                )}
                                {user && user.roles.includes("ROLES_ADMIN") && (
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                        <i className="bi bi-trash"></i> ลบ
                                    </button>
                                )}

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Restaurant;
