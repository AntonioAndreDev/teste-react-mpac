import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uaW9hbmRyZTEwMDhAZ21haWwuY29tIiwiZXhwIjoxNzQyNjY3MTk1fQ.vqblUWB3lkGR2xh0plPoGR31lw_dzbJRfpXMwdMdJFQ`;

        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
