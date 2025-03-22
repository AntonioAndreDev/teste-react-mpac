import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import formatIntToSalary from "@/utils/formatIntToSalary.ts";
import {formatDateToPtBr} from "@/utils/formateDateToPtBr.ts";
import {useNavigate} from "react-router";
import DeleteJobVacancyDialog from "@/components/home-view/DeleteJobVacancyDialog.tsx";
import {useState} from "react";
import {useJobStore} from "@/store/useJobStore.ts";
import {JobVacancy} from "@/types/jobTypes.ts";

export default function JobVacancyItem({jobVacancy}: { jobVacancy: JobVacancy }) {
    const {fetchJobVacancies, removeJobVacancy} = useJobStore();

    const [selectedJobToDelete, setSelectedJobToDelete] = useState<JobVacancy | null>(null);
    const navigate = useNavigate();

    const handleJobVacancyDeleted = async (id: number) => {
        await removeJobVacancy(id);
        await fetchJobVacancies();
        setSelectedJobToDelete(null);
    };

    function handleCloseDialog() {
        setSelectedJobToDelete(null)
    }

    return (
        <>
            <AlertDialog key={jobVacancy.id}>
                <AlertDialogTrigger
                    className="flex flex-col border-2 border-gray-200 rounded-lg p-6 bg-white hover:border-[#812316] cursor-pointer transition-all duration-200"
                >
                    <div className="flex justify-between items-center gap-1 flex-wrap w-full">
                        <h3 className="text-lg font-semibold text-start text-gray-900">{jobVacancy.role}</h3>
                        <div className="flex gap-x-4">
                            <div
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    setSelectedJobToDelete(jobVacancy);
                                }}
                            >
                                <TrashIcon className="sm:size-6 size-5 text-red-600 cursor-pointer"
                                           aria-hidden="true"/>
                            </div>

                            <div
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    navigate(`/editar-vaga/${jobVacancy.id}`);
                                }}
                            >
                                <PencilSquareIcon className="sm:size-6 size-5 text-yellow-600 cursor-pointer"
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
                                    <span className="text-base text-gray-500">
                                        <strong>Empresa</strong>: {jobVacancy.company}
                                    </span>

                            <span className="text-base text-gray-500">
                                        <strong>Localização</strong>: {jobVacancy.location}
                                    </span>

                            <span className="text-base text-gray-500">
                                        <strong>Salário (Bruto)</strong>: R${formatIntToSalary(jobVacancy.salary)}
                                    </span>

                            <span className="text-base text-gray-500">
                                        <strong>Modalidade</strong>: {jobVacancy.remote ? 'Remoto' : 'Presencial'}
                                    </span>

                            <span className="text-base text-gray-500">
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
                            className="bg-[#812316] hover:hover:bg-[#812316]/90 cursor-pointer font-semibold">
                            Candidatar-se
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {selectedJobToDelete && (
                <DeleteJobVacancyDialog
                    selectedJobToDelete={selectedJobToDelete}
                    onJobVacancyDeleted={handleJobVacancyDeleted}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    )
}