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
import {toast} from "sonner";
import {JobVacancy} from "@/types/jobTypes.ts";
import {useJobStore} from "@/store/useJobStore.ts";

export default function DeleteJobVacancyDialog({
                                                   selectedJobToDelete,
                                                   onClose
                                               }: {
    selectedJobToDelete: JobVacancy | null;
    onClose: () => void;
}) {
    const {fetchJobVacancies, removeJobVacancy} = useJobStore();
    if (!selectedJobToDelete) return null;

    const handleDelete = async () => {
        await removeJobVacancy(selectedJobToDelete.id);
        await fetchJobVacancies();

        onClose()
        toast.success('Vaga deletada com sucesso!', {
            className: '!bg-green-500 !text-white !text-base',
            duration: 8_000
        })
    };

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
                    <AlertDialogCancel
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <Button
                        className="font-semibold cursor-pointer"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Apagar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
