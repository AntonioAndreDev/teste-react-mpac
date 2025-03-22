import {Outlet} from "react-router";
import {Toaster} from "@/components/ui/sonner.tsx";

export default function AuthLayout() {
    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center mb-4">
                <img src="/assets/mpac-logo.png" alt="Logo do Ministério Público do Estado do Acre"/>
                <Outlet/>
            </div>
            <Toaster position="top-center"/>
        </>
    )
}