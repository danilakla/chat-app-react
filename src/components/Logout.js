import * as React from 'react';
import Switch from '@mui/material/Switch';
import {LOGOUT} from "../mutation/auth.mutation";
import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function BasicSwitches() {
    //LOGOUT
const navigate=useNavigate()
    const [logout] = useMutation(LOGOUT)
    async function isAuthCheck(){
        try {
            const res = await logout()
            console.log(res)
            if (res){
                localStorage.removeItem('access_token')
                setTimeout(()=>{
                    navigate('/');
                },300)
            }
        }catch (e) {
            console.log(e)
        }

    }
    return (
        <div style={{marginRight:30}}>
            logout
            <Switch onClick={isAuthCheck} {...label} defaultChecked color="secondary" />

        </div>
    );
}