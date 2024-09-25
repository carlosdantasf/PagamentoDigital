import axios from "axios";

const AxiosConfig = axios.create({
    baseURL: import.meta.env.VITE_PERSISTENCE_API,
});

export default AxiosConfig;