import { Outlet, Navigate } from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import React   from 'react';
import {useMutation} from "@apollo/client";
import {IS_Auth} from "../mutation/is-auth.mutation";

const PrivateRoutes = () => {
    const [items, setItems] = useState([]);
    const [isAuth] = useMutation(IS_Auth)
const isAuthCheck=async ()=>{
    const res = await isAuth()
    console.log(res)
}
    useEffect( () => {
        async function isAuthCheck(){
            try {
                const res = await isAuth()
                setItems(res.data.isAuth)
            }catch (e) {
                setItems(false)

            }

        }
        isAuthCheck().then()

    },[items] );
    return(true ? <Outlet/> : <Navigate to="/"/>)
}

export default PrivateRoutes