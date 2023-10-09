/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.services";

const Logout = () => {
    const navigate = useNavigate();
    const handleCancel = () => {
        AuthService.logout();
        navigate("/");
    };

    setTimeout(()=> {
        handleCancel();
    }, 3 * 1000);
    return <div>Logout</div>
};

export default Logout;