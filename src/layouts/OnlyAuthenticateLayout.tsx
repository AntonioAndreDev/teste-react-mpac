// Observação importante de segurança:
// O ideal seria realizar a validação do token no backend fazendo uma requisição para um endpoint que verifica se o token é válido
// Estamos realizando a validação apenas no frontend.

import {Navigate, Outlet} from "react-router";

const isTokenExpired = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return true;
    }

    const payload = atob(parts[1]);
    try {
        const parsedPayload = JSON.parse(payload);
        const expirationTime = parsedPayload.exp * 1000;
        return expirationTime < Date.now();
    } catch {
        return true;
    }
};


export default function OnlyAuthenticateLayout() {
    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}