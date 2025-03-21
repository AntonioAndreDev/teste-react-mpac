import {Route, Routes} from "react-router";
import LoginView from "../views/LoginView.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";
import OnlyAuthenticateLayout from "../layouts/OnlyAuthenticateLayout.tsx";
import OnlyGuestLayout from "../layouts/OnlyGuestLayout.tsx";
import CreateJobVacancyView from "../views/CreateJobVacancyView.tsx";
import HomeView from "../views/HomeView.tsx";

const RoutesConfig = (
    <Routes>

        <Route path="/login" element={<AuthLayout/>}>
            <Route element={<OnlyGuestLayout/>}>
                <Route index element={<LoginView/>}/>
            </Route>
        </Route>

        <Route path="/" element={<OnlyAuthenticateLayout/>}>
            <Route index element={<HomeView/>}/>

            <Route path={"criar-vaga"} element={<CreateJobVacancyView/>}/>
        </Route>


    </Routes>
);

export default RoutesConfig;
