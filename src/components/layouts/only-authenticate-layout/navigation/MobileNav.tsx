import {NavLink} from "react-router";
import {navigation} from "@/routes/navigation.ts";
import {classNames} from "@/utils/classNames.ts";
import Logout from "@/components/layouts/only-authenticate-layout/navigation/Logout.tsx";


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
                <Logout/>
            </ul>
        </nav>
    )
}