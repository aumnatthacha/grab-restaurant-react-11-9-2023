/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-md">
                <Link className="navbar-brand" to="">
                    <img src="https://cdn-icons-png.flaticon.com/512/5433/5433293.png?ga=GA1.1.144658777.1694708375"
                        style={{ width: '50px', height: 'auto' }}
                    />

                </Link>
                <form>
                    <button className="btn btn-outline-warning NotoSansThai-Regular">
                        <Link className="nav-link" to="/add">เพิ่มเมนูอาหาร</Link>
                    </button>
                    <button className="btn btn-outline-warning NotoSansThai-Regular">
                        <Link className="nav-link" to="/Signup">Signup</Link>
                    </button>
                    <button className="btn btn-outline-warning NotoSansThai-Regular">
                        <Link className="nav-link" to="/Login">Login</Link>
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar