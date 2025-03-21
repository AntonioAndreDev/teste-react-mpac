import {z} from "zod";
import {useState} from "react";
import * as React from "react";
import api from "../api/api.ts";
import {AxiosError} from "axios";
import {ApiError} from "../types/apiTypes.ts";
import formatSalaryToInt from "../utils/formatSalaryToInt.ts";

const createJobSchema = z.object({
    company: z
        .string()
        .min(3, {message: 'O nome da empresa precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O nome da empresa pode ter no máximo 50 caracteres.'}),
    link: z
        .string()
        .url({message: 'Por favor, insira um link válido.'}),
    location: z
        .string()
        .min(3, {message: 'O local precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O local pode ter no máximo 50 caracteres.'}),
    remote: z.boolean(),
    role: z
        .string()
        .min(3, {message: 'O cargo precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O cargo pode ter no máximo 50 caracteres.'}),
    salary: z
        .string()
        .min(3, {message: 'O salário precisa ter pelo menos 3 caracteres.'})
        .max(50, {message: 'O salário pode ter no máximo 50 caracteres.'}),
});

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
    const [serverErrors, setServerErrors] = useState<{ message: string, statusCode: number }>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const setFormValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [ev.target.name]: ev.target.value});
    };

    const handleSubmission = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const zodSchemaResult = createJobSchema.safeParse(formData);

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
            try {
                await api.post('/opening', formData);

                setFormData({
                    company: '',
                    link: '',
                    location: '',
                    remote: false,
                    role: '',
                    salary: '',
                });

                setSuccessMessage('Vaga cadastrada com sucesso!');
                setTimeout(() => setSuccessMessage(undefined), 5000);

            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                setServerErrors({
                    message: axiosError.response?.data.message || '',
                    statusCode: axiosError.response?.data.statusCode || 0,
                });
            }
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
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
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
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
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
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
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
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
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
                            className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
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
                            className="peer hidden"
                        />
                        <label
                            htmlFor="remote"
                            className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-200 cursor-pointer peer-checked:bg-[#812316] peer-checked:border-[#812316]"
                        />


                    </div>
                </div>

                {serverErrors && (
                    <div className="bg-red-400 p-4 rounded-md">
                        <p className="text-black text-sm font-semibold text-center uppercase">{serverErrors.message} ({serverErrors.statusCode})</p>
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-400 p-4 rounded-md">
                        <p className="text-black text-sm font-semibold text-center uppercase">{successMessage}</p>
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        className="flex cursor-pointer w-full justify-center rounded-md bg-[#812316] p-3 text-sm font-semibold text-white shadow-xs hover:bg-[#812316]/90 focus-visible:outline-2 focus-visible:outline-[#812316]"
                    >
                        Cadastrar vaga
                    </button>
                </div>
            </form>

        </div>
    )
}