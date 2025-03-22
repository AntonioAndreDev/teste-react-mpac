import {Navigate, Outlet} from "react-router";

export default function OnlyGuestLayout() {
    const token = localStorage.getItem('token');

    // Se o token existir, redireciona o usuário para a página inicial
    if (token) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}
