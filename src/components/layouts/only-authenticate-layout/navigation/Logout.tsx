import {ArrowLeftEndOnRectangleIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export default function Logout() {
    const navigate = useNavigate()
    return (
        <li className="-mx-6 mt-auto flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
            <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://avatars.githubusercontent.com/u/117135970?s=400&u=ebde57e649a7a7dc3175584fd274d016627a279e&v=4"
                alt="Foto de perfil"
            />
            <span className="sr-only">Your profile</span>
            <div className="flex justify-between w-full">
                <span aria-hidden="true">Antônio André</span>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-red-600 cursor-pointer"
                                                         aria-hidden="true"
                                                         onClick={() => {
                                                             localStorage.removeItem('token');
                                                             navigate('/login')
                                                         }}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Sair da conta</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


            </div>
        </li>
    )
}