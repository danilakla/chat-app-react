import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import ListFriend from "./components/page/ListFriend";
import {observer} from "mobx-react-lite";
import React from 'react';
import ResetPassword from "./components/page/ResetPassword";

import Dashboard from "./components/page/Home/Profile";
import NaveBare from "./components/page/NavBarProfile";

import ChatBox from "./components/page/Chat-room/Chat-Box";

function App() {


    return (
        <div className="App">

            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<NaveBare/>}>

                        <Route element={<ListFriend/>} path="products"/>
                        <Route element={<Dashboard/>} path="profile"/>
                        <Route element={<ChatBox/>} path="chat-room/:socketId"/>

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
