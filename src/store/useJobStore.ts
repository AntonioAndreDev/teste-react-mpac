import {create} from "zustand";
import {JobVacancy} from "@/types/apiTypes.ts";
import api from "@/api/api.ts";

interface JobStore {
    jobVacancies: JobVacancy[];
    isLoading: boolean;
    fetchJobVacancies: () => Promise<void>;
    removeJobVacancy: (id: number) => Promise<void>;
    fetchShowJobVacancy: (id: number) => Promise<void>;
    jobVacancy: JobVacancy;
    formData: {
        company: string;
        link: string;
        location: string;
        remote: boolean;
        role: string;
        salary: number;
    };
    fetchEditJobVacancy: (id: number, formData: JobStore['formData']) => Promise<void>;

}

export const useJobStore = create<JobStore>((set) => ({
    jobVacancies: [],
    jobVacancy: {
        id: 0,
        role: "",
        remote: false,
        link: "",
        location: "",
        salary: 0,
        company: "",
        created_at: "",
        updated_at: "",
    },
    isLoading: false,
    formData: {
        company: "",
        link: "",
        location: "",
        remote: false,
        role: "",
        salary: 0,
    },

    fetchJobVacancies: async () => {
        try {
            console.log("Iniciando fetchJobVacancies...");
            set({isLoading: true});
            const response = await api.get("/openings");
            const data = response.data.message;
            set({jobVacancies: data})
        } catch (error) {
            console.error("Erro ao buscar vagas", error);
        } finally {
            console.log("Finalizando fetchJobVacancies...");
            set({isLoading: false})
        }
    },


    removeJobVacancy: async (id: number) => {
        try {
            set({isLoading: true});
            await api.delete(`/opening?id=${id}`);
            const response = await api.get("/openings");
            set({jobVacancies: response.data.message});
        } catch (error) {
            console.error("Erro ao remover a vaga:", error);
        } finally {
            set({isLoading: false});
        }
    },

    fetchShowJobVacancy: async (id: number) => {
        try {
            console.log("Iniciando fetchShowJobVacancy...");
            set({isLoading: true});
            const response = await api.get(`/opening?id=${id}`);
            const data = response.data.message;
            set({jobVacancy: data});
        } catch (error) {
            console.error("Erro ao buscar vaga", error);
        } finally {
            console.log("Finalizando fetchShowJobVacancy...");
            set({isLoading: false});
        }
    },

    fetchEditJobVacancy: async (id: number, formData: JobStore['formData']) => {
        try {
            console.log("Iniciando fetchEditJobVacancy...");
            set({isLoading: true});
            const response = await api.put(`/opening?id=${id}`, formData);
            const data = response.data.message;
            set({jobVacancy: data});
        } catch (error) {
            console.error("Erro ao buscar vaga", error);
        } finally {
            console.log("Finalizando fetchEditJobVacancy...");
            set({isLoading: false});
        }
    },
}));
