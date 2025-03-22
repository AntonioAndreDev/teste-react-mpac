import {Skeleton} from "@/components/ui/skeleton.tsx";

{/*Observação importante:
    A API retorna uma mensagem de erro quando não há nenhuma vaga cadastrada.
    Dando conflito com a verificação de length do array de vagas, por isso comentei trechos desse código.
*/
}
import DeleteJobVacancyDialog from "@/components/DeleteJobVacancyDialog.tsx";
import {useEffect, useState} from "react";
import api from "../api/api.ts";
import {AxiosError} from "axios";
import {ApiError, JobVacancy} from "../types/apiTypes.ts";
import {Link, useNavigate} from "react-router";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {TrashIcon, PencilSquareIcon} from '@heroicons/react/24/outline'
import formatIntToSalary from "@/utils/formatIntToSalary.ts";
import {formatDateToPtBr} from "@/utils/formateDateToPtBr.ts";

export default function HomeView() {
    const [jobVacancies, setJobVacancies] = useState([]);
    const [selectedJobToDelete, setSelectedJob] = useState<JobVacancy | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
            <div>
                <Skeleton className="h-12 w-1/4"/>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>
                    <Skeleton className="h-40 w-full"/>

                </div>

            </div>
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
                <>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de Vagas</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            {jobVacancies.map((jobVacancy: JobVacancy) => (
                                <AlertDialog key={jobVacancy.id}>
                                    <AlertDialogTrigger
                                        className="flex flex-col border-2 border-gray-200 rounded-lg p-6 bg-white hover:border-[#812316] cursor-pointer transition-all duration-200"
                                    >
                                        <div className="flex justify-between w-full">
                                            <h3 className="text-lg font-semibold text-start text-gray-900">{jobVacancy.role}</h3>
                                            <div className="flex gap-x-4">
                                                <div
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        setSelectedJob(jobVacancy);
                                                    }}
                                                >
                                                    <TrashIcon className="h-6 w-6 text-red-600 cursor-pointer"
                                                               aria-hidden="true"/>
                                                </div>

                                                <div
                                                    onClick={(ev) => {
                                                        ev.stopPropagation();
                                                        navigate(`/editar-vaga/${jobVacancy.id}`);
                                                    }}
                                                >
                                                    <PencilSquareIcon className="h-6 w-6 text-yellow-600 cursor-pointer"
                                                                      aria-hidden="true"/>
                                                </div>

                                            </div>

                                        </div>
                                        <p className="text-sm text-start text-gray-500 mt-1">Empresa: {jobVacancy.company}</p>
                                        <p className="text-sm text-start text-gray-500 mt-1">Localização: {jobVacancy.location}</p>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-xl">
                                                {jobVacancy.role}
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="flex flex-col gap-y-1">
                                                <span
                                                    className="text-base text-gray-500"
                                                >
                                                    <strong>Empresa</strong>: {jobVacancy.company}
                                                </span>

                                                <span
                                                    className="text-base text-gray-500"
                                                >
                                                    <strong>Localização</strong>: {jobVacancy.location}
                                                </span>
                                                <span
                                                    className="text-base text-gray-500"
                                                >
                                                    <strong>Salário (Bruto)</strong>: R${formatIntToSalary(jobVacancy.salary)}
                                                </span>
                                                <span
                                                    className="text-base text-gray-500"
                                                >
                                                    <strong>Modalidade</strong>: {jobVacancy.remote ? 'Remoto' : 'Presencial'}
                                                </span>

                                                <span
                                                    className="text-base text-gray-500"
                                                >
                                                    <strong>Vaga criada em</strong>: {formatDateToPtBr(jobVacancy.created_at)}
                                                </span>


                                                <a target="_blank" referrerPolicy="no-referrer"
                                                   className="text-base text-gray-500 underline italic"
                                                   href={jobVacancy.link}
                                                >
                                                    Saiba mais
                                                </a>
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Fechar</AlertDialogCancel>
                                            <AlertDialogAction
                                                className="bg-[#812316] hover:hover:bg-[#812316]/90 cursor-pointer font-semibold">Candidatar-se</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            ))}
                        </div>
                    </div>
                </>
            )}


            {selectedJobToDelete &&
							<DeleteJobVacancyDialog selectedJobToDelete={selectedJobToDelete} setSelectedJob={setSelectedJob}
							                        onJobVacancyDeleted={onJobVacancyDeleted}/>}


        </>
    )
}