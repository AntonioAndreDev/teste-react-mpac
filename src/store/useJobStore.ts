import {create} from "zustand";
import {JobVacancy} from "@/types/apiTypes.ts";
import api from "@/api/api.ts";

interface JobStore {
    jobVacancies: JobVacancy[];
    isLoading: boolean;
    fetchJobVacancies: () => Promise<void>;
    removeJobVacancy: (id: number) => Promise<void>;
}

export const useJobStore = create<JobStore>((set) => ({
    jobVacancies: [],
    isLoading: false,

    fetchJobVacancies: async () => {
        try {
            set({isLoading: true});
            const response = await api.get("/openings");
            const data = response.data.message;
            set({jobVacancies: data})
        } catch (error) {
            console.error("Erro ao buscar vagas", error);
        } finally {
            set({isLoading: false})
        }
    },


    removeJobVacancy: async (id: number) => {
        set({isLoading: true});
        try {
            await api.delete(`/opening?id=${id}`);
            const response = await api.get("/openings");
            set({jobVacancies: response.data.message});
        } catch (error) {
            console.error("Erro ao remover a vaga:", error);
        } finally {
            set({isLoading: false});
        }
    },
}));
