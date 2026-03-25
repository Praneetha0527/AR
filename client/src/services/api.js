import axios from "axios";

const API = axios.create({ baseURL: "https://bharani-silks-api.onrender.com/api" });

// Add token to request if available
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export const getProducts = (params = {}) => {
    let url = "/products";
    if (typeof params === 'string') {
        url += `?category=${params}`;
    } else {
        const query = new URLSearchParams(params).toString();
        if (query) url += `?${query}`;
    }
    return API.get(url);
};
export const getProductById = (id) => API.get(`/products/${id}`);
export const login = (data) => API.post("/users/login", data);
export const register = (data) => API.post("/users/register", data);
export const getProfile = () => API.get("/users/profile");
export const createProduct = (data) => API.post("/products", data);
