import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {AxiosError} from "axios";
import {ApiError, JobVacancy} from "../types/apiTypes.ts";
import {Link} from "react-router";

export default function HomeView() {
    const [jobVacancies, setJobVacancies] = useState([]);
    const [serverErrors, setServerErrors] = useState<{ message: string, statusCode: number }>();

    useEffect(() => {
        async function fetchJobVacancies() {
            try {
                const response = await api.get('/openings');
                setJobVacancies(response.data.message);

            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                setServerErrors({
                    message: axiosError.response?.data.message || '',
                    statusCode: axiosError.response?.data.statusCode || 0,
                });
            }
        }

        fetchJobVacancies()
    }, []);

    return (
        <>
            {serverErrors && (
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Opps... parece que houve um
                        erro</h2>
                    <span className="block sm:inline">{serverErrors?.message}</span>
                    <span className="block sm:inline">{serverErrors?.statusCode}</span>
                </div>
            )}

            {jobVacancies.length === 0 && (
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nenhuma vaga encontrada</h2>
                    <span className="block sm:inline">Parece que ainda não há nenhuma vagas disponível</span>
                    <Link className="block font-medium border border-gray-500 w-fit p-1 rounded hover:underline"
                          to="/criar-vaga">
                        Criar uma vaga
                    </Link>
                </div>
            )}

            {jobVacancies.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de Vagas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        {jobVacancies.map((jobVacancy: JobVacancy) => (
                            <div
                                key={jobVacancy.id}
                                className="border-2 border-gray-200 rounded-lg p-6 bg-white hover:border-[#812316] cursor-pointer transition-all duration-200"
                            >
                                <h3 className="text-lg font-semibold text-gray-900">{jobVacancy.role}</h3>
                                <p className="text-sm text-gray-500 mt-1">Empresa: {jobVacancy.company}</p>
                                <p className="text-sm text-gray-500 mt-1">Localização: {jobVacancy.location}</p>
                            </div>
                        ))}
                    </div>

                </div>
            )}


        </>
    )
}