import React from 'react'
import {Link, Outlet} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Link to={'/home'}>HOME</Link>
            <Link to={'/products'}>Product</Link>
            <Outlet/>
        </>
)
}

export default Navbar