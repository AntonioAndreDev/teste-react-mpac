import {useState} from "react";
import * as React from "react";
import api from "../api/api.ts";
import {AxiosError} from "axios";
import {ApiError} from "../types/apiTypes.ts";
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {loginSchema} from "@/validations/zodSchemas.ts";


export default function LoginView() {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [formErrors, setFormErrors] = useState<{ email?: string, password?: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmission = async (ev: React.FormEvent) => {
        ev.preventDefault()

        const zodSchemaResult = loginSchema.safeParse(formData);

        if (zodSchemaResult.success) {
            setFormErrors(
                {
                    email: undefined,
                    password: undefined,
                }
            );

            await loginRequest(formData.email, formData.password);
        }

        if (zodSchemaResult.error) {
            const formErrors = zodSchemaResult.error.formErrors.fieldErrors;

            setFormErrors({
                email: formErrors.email?.[0],
                password: formErrors.password?.[0],
            });
        }

        async function loginRequest(email: string, password: string) {
            try {
                setIsLoading(true)
                const response = await api.post('/login', {email, password});
                localStorage.setItem('token', response.data.message);
                navigate('/');
            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;


                toast.error(`Erro ${axiosError.response?.data.statusCode}: ${axiosError.response?.data.message}`, {
                    className: '!bg-red-500 !text-white !text-base',
                    duration: 12_000
                })
            } finally {
                setIsLoading(false)
            }
        }
    }

    const setFormValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        });
    };

    return (
        <div className="bg-white sm:p-6 p-4 rounded-2xl shadow-md sm:w-fit w-full">
            <div className="">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Entre na sua conta</h2>

                <form className="space-y-4 mt-4" onSubmit={handleSubmission}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={setFormValue}
                                disabled={isLoading}
                                className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                            />
                        </div>
                        {formErrors?.email && (
                            <p className="text-red-500 text-sm font-medium mt-2">{formErrors.email}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-900">Senha</label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={setFormValue}
                                disabled={isLoading}
                                className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm disabled:opacity-50"
                            />
                        </div>
                        {formErrors?.password && (
                            <p className="text-red-500 text-sm font-medium mt-2">{formErrors.password}</p>
                        )}
                    </div>

                    <div className="text-sm text-end">
                        <a href="#" className="font-semibold text-[#812316] hover:text-[#812316]/90">Esqueceu sua
                            senha?</a>
                    </div>


                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex cursor-pointer w-full justify-center rounded-md bg-[#812316] p-3 text-sm font-semibold text-white shadow-xs hover:bg-[#812316]/90 focus-visible:outline-2 focus-visible:outline-[#812316] disabled:bg-[#812316]/50 disabled:cursor-progress"
                        >
                            Entrar agora
                        </button>
                    </div>
                </form>

                <div className="relative flex my-8 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400">Ou entre com</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div
                        className="flex border border-gray-200 w-full gap-x-4 items-center justify-center rounded-md py-3 px-12 cursor-pointer">
                        <img src="/assets/google.png" alt="Google logo"/>
                        <p className="text-lg text-black">Google</p>
                    </div>

                    <div
                        className="flex border border-gray-200 w-full gap-x-4 items-center justify-center rounded-md py-3 px-12 cursor-pointer">
                        <img src="/assets/apple.png" alt="Apple logo"/>
                        <p className="text-lg text-black">Apple</p>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Não possui uma conta?{" "}
                    <a href="#" className="font-semibold text-[#812316] hover:text-[#812316]/90">Crie uma</a>
                </p>
            </div>
        </div>
    );
}
