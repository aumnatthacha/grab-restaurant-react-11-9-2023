/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;

const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

const Add = () => {
    // สร้าง state เพื่อเก็บข้อมูลเมนูอาหาร
    const [menu, setMenu] = useState({
        name: '',
        type: '',
        img: '',
    });

    // ฟังก์ชันเมื่อข้อมูลเมนูเปลี่ยนแปลง
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMenu({
            ...menu,
            [name]: value,
        });
    };

    const handleAddMenu = async () => {
        try {
            const response = await axios.post(`${URL}/res`, menu, config);
            console.log('เพิ่มเมนูอาหารแล้ว:', response.data);
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเพิ่มเมนูอาหาร:', error);
        }
    };

    return (
        <div>
            <h2>Add Menu</h2>
            <form>
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
                        <img src={menu.img} alt="รูปภาพตัวอย่าง" style={{ maxWidth: '100%' }} />
                    </div>
                )}
                <button type="button" className="btn btn-primary" onClick={handleAddMenu}>
                    เพิ่มเมนูอาหาร
                </button>
            </form>
        </div>
    );
};

export default Add;
