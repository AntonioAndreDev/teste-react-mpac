// Observação importante de segurança:
// O ideal seria realizar a validação do token no backend fazendo uma requisição para um endpoint que verifica se o token é válido
// Estamos realizando a validação apenas no frontend.

import {Navigate, NavLink, Outlet, useLocation} from "react-router";
import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    HomeIcon,
    XMarkIcon,
    PlusIcon,
    ArrowLeftEndOnRectangleIcon
} from '@heroicons/react/24/outline'
import {Toaster} from "@/components/ui/sonner.tsx";

const navigation = [
    {name: 'Ver todas as vagas', href: '/', icon: HomeIcon},
    {name: 'Criar uma vaga', href: '/criar-vaga', icon: PlusIcon},
]


const isTokenExpired = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return true;
    }

    const payload = atob(parts[1]);
    try {
        const parsedPayload = JSON.parse(payload);
        const expirationTime = parsedPayload.exp * 1000;
        return expirationTime < Date.now();
    } catch {
        return true;
    }
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function OnlyAuthenticateLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation();


    const token = localStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace/>;
    }

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5"
                                                    onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white cursor-pointer"
                                                           aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                        <div className="flex mt-4 items-center">
                                            <img
                                                className="h-12 w-auto"
                                                src="/assets/mpac-logo.png"
                                                alt="Logo do Ministério Público do Estado do Acre"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-12">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => {
                                                            const isCurrent = location.pathname === item.href;
                                                            return (
                                                                <li key={item.name}>
                                                                    <NavLink
                                                                        to={item.href}
                                                                        className={({isActive}) =>
                                                                            classNames(
                                                                                isActive
                                                                                    ? 'bg-gray-50 text-[#812316]'
                                                                                    : 'text-gray-700 hover:text-[#812316] hover:bg-gray-50',
                                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                            )
                                                                        }
                                                                    >
                                                                        <item.icon
                                                                            className={classNames(
                                                                                isCurrent ? 'text-[#812316]' : 'text-gray-400 group-hover:text-[#812316]',
                                                                                'h-6 w-6 shrink-0'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />

                                                                        {item.name}
                                                                    </NavLink>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                                <li className="-mx-6 mt-auto flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                                                    <img
                                                        className="h-8 w-8 rounded-full bg-gray-50"
                                                        src="https://avatars.githubusercontent.com/u/117135970?s=400&u=ebde57e649a7a7dc3175584fd274d016627a279e&v=4"
                                                        alt="Foto de perfil"
                                                    />
                                                    <span className="sr-only">Your profile</span>
                                                    <div className="flex justify-between w-full">
                                                        <span aria-hidden="true">Antônio André</span>

                                                        <ArrowLeftEndOnRectangleIcon
                                                            className="h-6 w-6 text-red-600 cursor-pointer"
                                                            aria-hidden="true"
                                                            onClick={() => {
                                                                localStorage.removeItem('token');
                                                                window.location.href = '/login';
                                                            }}
                                                        />

                                                    </div>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                        <div className="flex mt-4 items-center">
                            <img
                                className="h-16 w-auto"
                                src="/assets/mpac-logo.png"
                                alt="Logo do Ministério Público do Estado do Acre"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-4">
                                        {navigation.map((item) => {
                                            const isCurrent = location.pathname === item.href;
                                            return (
                                                <li key={item.name}>
                                                    <NavLink
                                                        to={item.href}
                                                        className={({isActive}) =>
                                                            classNames(
                                                                isActive
                                                                    ? 'bg-gray-50 text-[#812316]'
                                                                    : 'text-gray-700 hover:text-[#812316] hover:bg-gray-50',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                            )
                                                        }
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                isCurrent ? 'text-[#812316]' : 'text-gray-400 group-hover:text-[#812316]',
                                                                'h-6 w-6 shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />

                                                        {item.name}
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                                    <img
                                        className="h-8 w-8 rounded-full bg-gray-50"
                                        src="https://avatars.githubusercontent.com/u/117135970?s=400&u=ebde57e649a7a7dc3175584fd274d016627a279e&v=4"
                                        alt="Foto de perfil"
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <div className="flex justify-between w-full">
                                        <span aria-hidden="true">Antônio André</span>

                                        <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-red-600 cursor-pointer"
                                                                     aria-hidden="true"
                                                                     onClick={() => {
                                                                         localStorage.removeItem('token');
                                                                         window.location.href = '/login';
                                                                     }}
                                        />

                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6 cursor-pointer" aria-hidden="true"/>
                    </button>
                    <div className="flex justify-end w-full">
                        <img
                            className="h-8 w-8 rounded-full bg-gray-50"
                            src="https://avatars.githubusercontent.com/u/117135970?s=400&u=ebde57e649a7a7dc3175584fd274d016627a279e&v=4"
                            alt="Foto de perfil"
                        />

                    </div>
                </div>

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <Outlet/>
                    </div>
                </main>

                <Toaster/>
            </div>
        </>
    )
}