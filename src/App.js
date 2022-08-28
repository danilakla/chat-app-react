import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import Home from "./components/page/Home";
import ListFriend from "./components/page/ListFriend";
import Navbar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import React   from 'react';
import GoogleLogin from "react-google-login";
import ResetPassword from "./components/page/ResetPassword";

function App() {
    return (
        <div className="App">


            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<Navbar/>}>
                        <Route element={<Home/>} path="home"/>
                        <Route element={<ListFriend/>} path="products"/>
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
