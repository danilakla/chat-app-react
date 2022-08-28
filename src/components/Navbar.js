import React from 'react'
import {Link, Outlet} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Link to={'/profile'}>HOME</Link>
            <Link to={'/products'}>Product</Link>
            <Link to={'/'}>Product</Link>
            <Link to={'/up'}>Product</Link>

            <Outlet/>
        </>
)
}

export default Navbar