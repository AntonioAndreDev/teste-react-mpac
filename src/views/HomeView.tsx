import HomeLoadingSkeleton from "@/components/home-view/loading-structures/HomeLoadingSkeleton.tsx";
import DeleteJobVacancyDialog from "@/components/DeleteJobVacancyDialog.tsx";
import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {AxiosError} from "axios";
import {ApiError, JobVacancy} from "../types/apiTypes.ts";
import EmptyJobVacancy from "@/components/home-view/EmptyJobVacancy.tsx";
import JobsVacancyList from "@/components/home-view/JobsVacancyList.tsx";

{/*Observação importante:
    A API retorna uma mensagem de erro quando não há nenhuma vaga cadastrada.
    Dando conflito com a verificação de length do array de vagas, por isso comentei trechos desse código.
*/
}

export default function HomeView() {
    const [jobVacancies, setJobVacancies] = useState([]);
    const [selectedJobToDelete, setSelectedJob] = useState<JobVacancy | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // const [serverErrors, setServerErrors] = useState<{ message: string, statusCode: number }>();

    useEffect(() => {
        async function fetchJobVacancies() {
            try {
                const response = await api.get('/openings');
                setJobVacancies(response.data.message);
                setIsLoading(true)

            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                console.log(axiosError)
                // setServerErrors({
                //     message: axiosError.response?.data.message || '',
                //     statusCode: axiosError.response?.data.statusCode || 0,
                // });
            } finally {
                setIsLoading(false)
            }
        }

        fetchJobVacancies()
    }, []);

    async function onJobVacancyDeleted(data: boolean) {
        if (data) {
            try {
                const response = await api.get('/openings');
                setJobVacancies(response.data.message);
            } catch (error) {
                console.error("Erro ao atualizar vagas", error);
            }
        }
    }

    if (isLoading) {
        return (
            <HomeLoadingSkeleton/>
        )
    }

    if (jobVacancies.length === 0) {
        return (
            <EmptyJobVacancy/>
        )
    }

    return (
        <>
            {/*
            {serverErrors && (
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Opps... parece que houve um
                        erro</h2>
                    <span className="block sm:inline">{serverErrors?.message}</span>
                    <span className="block sm:inline">{serverErrors?.statusCode}</span>
                </div>
            )}
            */}


            {jobVacancies.length > 0 && (
                <>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de Vagas</h2>
                        <JobsVacancyList jobVacancies={jobVacancies}/>
                    </div>
                </>
            )}


            {selectedJobToDelete &&
							<DeleteJobVacancyDialog selectedJobToDelete={selectedJobToDelete} setSelectedJob={setSelectedJob}
							                        onJobVacancyDeleted={onJobVacancyDeleted}/>}


        </>
    )
}