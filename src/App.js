import {Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/page/SignIn";
import SignUp from "./components/page/SignUp";
import PrivateRoutes from "./utils/PrivateRoutes";
import Home from "./components/page/Home";
import ListFriend from "./components/page/ListFriend";
import Navbar from "./components/Navbar";

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

export default App;