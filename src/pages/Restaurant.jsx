/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

const Restaurant = () => {
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
        try {
            await axios.delete(`${URL}/res/${id}`, config);
            const res = await axios.get(`${URL}/res`, config);
            setRestaurant(res.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลบร้านอาหาร:', error);
        }
    };

    return (
        <div className=''>
            <h1 className='h1Restaurant'>Restaurant</h1>
            <div className="search-container">
                <div className="search-box">
                    <input
                        className="custom-search-input"
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        {/* <i className="fas fa-search"></i> */}
                    </button>
                </div>
            </div>

            <ul className="restaurant-list">
                {filteredRestaurant.map((item) => (
                    <li key={item.id} className="restaurant-card">
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.type}</p>
                            <img src={item.img} alt={item.name} />
                            <div className="button-container">
                                <button className="view-button" onClick={() => navigate('./update/' + item.id)}>
                                    แก้ไข
                                </button>
                                <button className="reserve-button" onClick={() => handleDelete(item.id)}>
                                    ลบ
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Restaurant;
