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

export default function DeleteJobVacancyDialog({
                                                   selectedJobToDelete,
                                                   onJobVacancyDeleted,
                                                   onClose
                                               }: {
    selectedJobToDelete: JobVacancy | null;
    onJobVacancyDeleted: (id: number) => void;
    onClose: () => void;
}) {
    if (!selectedJobToDelete) return null;

    const handleDelete = () => {
        onJobVacancyDeleted(selectedJobToDelete.id);
        onClose()
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
