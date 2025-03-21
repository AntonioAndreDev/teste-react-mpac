export default function LoginView() {
    return (
        <div className="bg-white w-full sm:w-1/4 mx-auto p-6 rounded-2xl shadow-xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Entre na sua conta</h2>

                <form className="space-y-4 mt-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
                            />
                        </div>
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
                                required
                                className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-[#812316] sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="text-sm text-end">
                        <a href="#" className="font-semibold text-[#812316] hover:text-[#812316]/90">Esqueceu sua
                            senha?</a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex cursor-pointer w-full justify-center rounded-md bg-[#812316] p-3 text-sm font-semibold text-white shadow-xs hover:bg-[#812316]/90 focus-visible:outline-2 focus-visible:outline-[#812316]"
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

                <div className="grid grid-cols-2 gap-4">
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
