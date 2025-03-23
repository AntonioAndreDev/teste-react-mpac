import {lazy, Suspense} from "react";
import {Route, Routes} from "react-router";
import FallbackSkeleton from "@/components/FallbackSkeleton.tsx";

const LoginView = lazy(() => import('@/views/LoginView.tsx'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout.tsx'));
const OnlyAuthenticateLayout = lazy(() => import('@/layouts/OnlyAuthenticateLayout.tsx'));
const OnlyGuestLayout = lazy(() => import('@/layouts/OnlyGuestLayout.tsx'));
const CreateJobVacancyView = lazy(() => import('@/views/CreateJobVacancyView.tsx'));
const HomeView = lazy(() => import('@/views/HomeView.tsx'));
const EditJobVacancyView = lazy(() => import('@/views/EditJobVacancyView.tsx'));

const Loading = () => <FallbackSkeleton/>;

const RoutesConfig = (
    <Suspense fallback={<Loading/>}>
        <Routes>
            <Route path="/login" element={<AuthLayout/>}>
                <Route element={<OnlyGuestLayout/>}>
                    <Route index element={<LoginView/>}/>
                </Route>
            </Route>

            <Route path="/" element={<OnlyAuthenticateLayout/>}>
                <Route index element={<HomeView/>}/>
                <Route path="criar-vaga" element={<CreateJobVacancyView/>}/>
                <Route path="editar-vaga/:vagaId" element={<EditJobVacancyView/>}/>
            </Route>
        </Routes>
    </Suspense>
);

export default RoutesConfig;
