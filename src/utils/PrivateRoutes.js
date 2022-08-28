import { Outlet, Navigate } from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import React   from 'react';

const PrivateRoutes = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (items) {
            setItems(token);
        }
    }, []);
    return(items ? <Outlet/> : <Navigate to="/"/>)
}

export default PrivateRoutes