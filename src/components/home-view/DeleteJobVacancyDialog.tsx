import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {JobVacancy} from "@/types/apiTypes.ts";
import api from "@/api/api.ts";
import {toast} from "sonner";

export default function DeleteJobVacancyDialog({selectedJobToDelete, setSelectedJobToDelete, onJobVacancyDeleted}: {
    selectedJobToDelete: JobVacancy | null,
    setSelectedJobToDelete: (job: JobVacancy | null) => void
    onJobVacancyDeleted: (data: boolean) => Promise<void>
}) {

    async function deleteJobVacancyRequest(id: number) {
        try {
            await api.delete(`/opening?id=${id}`);
            setSelectedJobToDelete(null);
            toast.success('Vaga apagada com sucesso!', {
                className: '!bg-green-500 !text-white !text-base',
                duration: 8_000
            })
            await onJobVacancyDeleted(true);
        } catch (error) {
            console.error("Erro ao deletar vaga", error);
        }
    }

    return (
        <AlertDialog open={!!selectedJobToDelete}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Realmente deseja deletar {selectedJobToDelete?.role} - {selectedJobToDelete?.company}?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-gray-500">
                        Essa ação não poderá ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer"
                                       onClick={() => setSelectedJobToDelete(null)}>Cancelar</AlertDialogCancel>
                    <Button
                        className="font-semibold cursor-pointer"
                        variant="destructive"
                        onClick={() => selectedJobToDelete?.id !== undefined && deleteJobVacancyRequest(selectedJobToDelete.id)}
                    >
                        Apagar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
