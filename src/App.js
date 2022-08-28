import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import ListFriend from "./components/page/ListFriend";
import Navbar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import React from 'react';
import GoogleLogin from "react-google-login";
import ResetPassword from "./components/page/ResetPassword";
import Deposits from "./components/page/Home/Deposits";
import Profile from "./components/page/Home/Profile";
import Dashboard from "./components/page/Home/Profile";
import NaveBare from "./components/page/Home/NavBarProfile";
import NaveBar from "./components/page/Home/NavBarProfile";

function App() {

    return (
        <div className="App">


            <Routes>
                <Route element={<PrivateRoutes/>}>
                        <Route element={<NaveBare/>}>

                        <Route element={<ListFriend/>} path="products"/>
                        <Route element={<Dashboard/>} path="profile"/>

                    </Route>

                </Route>
                <Route path="/reset-password/:resetToken" element={<ResetPassword/>}/>

                <Route path="/" element={<SignIn/>}/>
                <Route path="/up" element={<SignUp/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </div>
    );
}

export default observer(App);
