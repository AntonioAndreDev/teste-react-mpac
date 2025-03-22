import {NavLink} from "react-router";
import {ArrowLeftEndOnRectangleIcon} from "@heroicons/react/24/outline";
import {navigation} from "@/routes/navigation.ts";
import {classNames} from "@/utils/classNames.ts";


export default function MobileNav({setSidebarOpen}: { setSidebarOpen: (value: boolean) => void }) {
    return (
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
                                        onClick={() => setSidebarOpen(false)}
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
    )
}