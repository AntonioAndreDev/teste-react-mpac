import {useEffect} from "react";
import HomeLoadingSkeleton from "@/components/home-view/loading-structures/HomeLoadingSkeleton.tsx";
import {useJobStore} from "@/store/useJobStore.ts";
import EmptyJobVacancy from "@/components/home-view/EmptyJobVacancy.tsx";
import JobVacancyItem from "@/components/home-view/JobVacancyItem.tsx";
import {JobVacancy} from "@/types/jobTypes.ts";

export default function JobsVacancyList() {
    const {jobVacancies, fetchJobVacancies, isLoading} = useJobStore();

    useEffect(() => {
        fetchJobVacancies();
    }, []);


    if (isLoading) {
        return <HomeLoadingSkeleton/>;
    }


    if (jobVacancies.length === 0) {
        return <EmptyJobVacancy/>

    }

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Lista de Vagas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {jobVacancies.map((jobVacancy: JobVacancy) => (
                    <JobVacancyItem jobVacancy={jobVacancy} key={jobVacancy.id}/>
                ))}
            </div>
        </>
    );
}

