import {useState} from "react";
import * as React from "react";
import formatSalaryToInt from "../utils/formatSalaryToInt.ts";
import {toast} from "sonner";
import {useJobStore} from "@/store/useJobStore.ts";
import {createOrEditJobSchema} from "@/validations/zodSchemas.ts";


export default function CreateJobVacancyView() {
    const [formData, setFormData] = useState({
        company: '',
        link: '',
        location: '',
        remote: false,
        role: '',
        salary: '',
    });
    const [formErrors, setFormErrors] = useState<{
        company?: string,
        link?: string,
        location?: string,
        role?: string,
        salary?: string,
    }>();
    const {fetchCreateJobVacancy, isLoading} = useJobStore();


    const setFormValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [ev.target.name]: ev.target.value});
    };

    const handleSubmission = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const zodSchemaResult = createOrEditJobSchema.safeParse(formData);

        if (zodSchemaResult.success) {
            setFormErrors(
                {
                    company: undefined,
                    link: undefined,
                    location: undefined,
                    role: undefined,
                    salary: undefined,
                }
            );

            const salaryToInt = formatSalaryToInt(formData.salary)

            await createJobRequest({...formData, salary: salaryToInt});
        }

        if (zodSchemaResult.error) {
            const formErrors = zodSchemaResult.error.formErrors.fieldErrors;

            setFormErrors({
                company: formErrors.company?.[0],
                link: formErrors.link?.[0],
                location: formErrors.location?.[0],
                role: formErrors.role?.[0],
                salary: formErrors.salary?.[0],
            });
        }

        async function createJobRequest(formData: {
            company: string;
            link: string;
            location: string;
            remote: boolean;
            role: string;
            salary: number;
        }) {
            fetchCreateJobVacancy(formData)

            setFormData({
                company: '',
                link: '',
                location: '',
                remote: false,
                role: '',
                salary: '',
            });

            toast.success('Vaga cadastrada com sucesso!', {
                className: '!bg-green-500 !text-white !text-base',
                duration: 8_000
            })

        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Criar uma vaga</h2>

            <form className="space-y-4 mt-4" onSubmit={handleSubmission}>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-900">Empresa</label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="company"
                            id="company"
                            value={formData.company}
                            onChange={setFormValue}
                            disabled={isLoading}
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                        />
                    </div>
                    {formErrors?.company && (
                        <p className="text-red-500 text-sm font-medium mt-2">{formErrors.company}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="link"
                               className="block text-sm font-medium text-gray-900">Link (para mais informações)</label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="link"
                            id="link"
                            value={formData.link}
                            onChange={setFormValue}
                            disabled={isLoading}
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                        />
                    </div>
                    {formErrors?.link && (
                        <p className="text-red-500 text-sm font-medium mt-2">{formErrors.link}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="location"
                               className="block text-sm font-medium text-gray-900">Localização</label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={setFormValue}
                            disabled={isLoading}
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                        />
                    </div>
                    {formErrors?.location && (
                        <p className="text-red-500 text-sm font-medium mt-2">{formErrors.location}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="role"
                               className="block text-sm font-medium text-gray-900">Cargo/Função</label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={setFormValue}
                            disabled={isLoading}
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                        />
                    </div>
                    {formErrors?.role && (
                        <p className="text-red-500 text-sm font-medium mt-2">{formErrors.role}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="salary"
                               className="block text-sm font-medium text-gray-900">Salário/Remuneração (Bruto)</label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="salary"
                            id="salary"
                            value={formData.salary}
                            onChange={setFormValue}
                            disabled={isLoading}
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                        />
                    </div>
                    {formErrors?.salary && (
                        <p className="text-red-500 text-sm font-medium mt-2">{formErrors.salary}</p>
                    )}
                </div>

                <div>
                    <div className="flex">
                        <label htmlFor="remote" className="block text-sm font-medium text-gray-900">Remoto</label>
                    </div>
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            name="remote"
                            id="remote"
                            checked={formData.remote}
                            onChange={(ev) => setFormData({...formData, remote: ev.target.checked})}
                            disabled={isLoading}
                            className="peer hidden disabled:opacity-50"
                        />
                        <label
                            htmlFor="remote"
                            className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-200 cursor-pointer peer-checked:bg-[#812316] peer-checked:border-[#812316]"
                        />


                    </div>
                </div>


                <div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="flex cursor-pointer w-full justify-center rounded-md bg-[#812316] p-3 text-sm font-semibold text-white shadow-xs hover:bg-[#812316]/90 focus-visible:outline-2 focus-visible:outline-[#812316] disabled:bg-[#812316]/50 disabled:cursor-progress"
                    >
                        Cadastrar vaga
                    </button>
                </div>
            </form>

        </div>
    )
}