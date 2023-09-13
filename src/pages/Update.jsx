/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Update.css';


const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};



const Update = () => {
    let { id } = useParams();
    console.log(id)
    const [menu, setMenu] = useState({
        name: '',
        type: '',
        img: '',
    });


    const fetchMenuItem = async (menuItemId) => {
        try {
            const response = await axios.get(`${URL}/res/${menuItemId}`, config);
            console.log(response.data)
            const menuItemData = response.data;
            setMenu(menuItemData);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลเมนูอาหาร:', error);
        }
    };

    const handleUpdateMenu = async () => {
        try {
            const response = await axios.put(`${URL}/res/${menu.id}`, menu, config);
            console.log('อัปเดตเมนูอาหารแล้ว:', response.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตเมนูอาหาร:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMenu({
            ...menu,
            [name]: value,
        });
    };


    const handleCancel = () => {
        history.push('/');
    };


    useEffect(() => {
        const menuItemId = 'your_menu_item_id_here';
        fetchMenuItem(id);
    }, []);

    return (
        <div>
            <h2 className="text-center">Update Menu</h2>
            <form className="container-sm"> {/* เพิ่ม .container-sm เพื่อทำให้ container เล็กลง */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        ชื่อเมนู:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={menu.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        ประเภท:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={menu.type}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">
                        URL รูปภาพ:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="img"
                        name="img"
                        value={menu.img}
                        onChange={handleInputChange}
                    />
                </div>
                {menu.img && (
                    <div className="mb-3">
                        <label>ตัวอย่างรูปภาพ:</label>
                        <br />
                        <img src={menu.img} alt="รูปภาพตัวอย่าง" className="img-fluid" />
                    </div>
                )}
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleUpdateMenu}>
                        อัปเดตเมนูอาหาร
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Update;
