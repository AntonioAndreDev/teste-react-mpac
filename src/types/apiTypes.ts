export interface ApiError {
    message: string;
    statusCode: number;
}

export interface JobVacancy {
    id: number;
    role: string;
    company: string;
    location: string;
    remote: boolean;
    link: string;
    salary: string;
    created_at: string;
    updated_at: string;
}