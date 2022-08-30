import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import ListFriend from "./components/page/ListFriend";
import {observer} from "mobx-react-lite";
import React from 'react';
import GoogleLogin from "react-google-login";
import ResetPassword from "./components/page/ResetPassword";
import Deposits from "./components/page/Home/Deposits";
import Profile from "./components/page/Home/Profile";
import Dashboard from "./components/page/Home/Profile";
import NaveBare from "./components/page/Home/NavBarProfile";
import NaveBar from "./components/page/Home/NavBarProfile";
import  {ChatRoom} from "./components/page/Chat-room/Chat-room";
import Chat from "./components/page/Chat-room/Chat-room";
import ChatBox from "./components/page/Chat-room/Chat-Box";

function App() {
    function showConfirm(){
        console.log('dasdas')
        setTimeout(()=>'3',10000)
    }
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
