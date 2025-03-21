import {useEffect} from "react";
import api from "./api/api.ts";
import {AxiosError} from "axios";
import {ApiError} from "./types/apiTypes.ts";

function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/opening?id=1"); // Requisição GET autenticada
                console.log(response);
            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                console.error("Erro ao buscar os dados: ", axiosError.response?.data.message, axiosError.response?.data.statusCode);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </>
    )
}

export default App
