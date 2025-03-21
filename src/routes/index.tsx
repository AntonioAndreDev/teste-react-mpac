import App from '../App';
import {Route, Routes} from "react-router";
import LoginView from "../views/LoginView.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";

const RoutesConfig = (
    <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<AuthLayout/>}>
            <Route index element={<LoginView/>}/>
        </Route>


    </Routes>
);

export default RoutesConfig;
