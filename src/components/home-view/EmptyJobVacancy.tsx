import {Link} from "react-router";

export default function EmptyJobVacancy() {
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nenhuma vaga encontrada</h2>
            <span className="block sm:inline">Parece que ainda não há nenhuma vagas disponível</span>
            <Link className="block font-medium border border-gray-500 w-fit p-1 rounded hover:underline"
                  to="/criar-vaga">
                Criar uma vaga
            </Link>
        </>
    )
}