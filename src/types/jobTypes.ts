export interface JobVacancy {
    id: number;
    role: string;
    company: string;
    location: string;
    remote: boolean;
    link: string;
    salary: number;
    created_at: string;
    updated_at: string;
}

export interface JobVacancyFormData {
    company: string;
    link: string;
    location: string;
    remote: boolean;
    role: string;
    salary: number;
}

export interface JobVacancyFormDataErrors {
    company?: string,
    link?: string,
    location?: string,
    role?: string,
    salary?: string,
}