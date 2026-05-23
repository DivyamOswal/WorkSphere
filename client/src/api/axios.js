import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "/api"
})

// Attach Auth token to all network requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    const isAuthRoute = config.url?.includes("/auth/")

    if (token && !isAuthRoute) {                        
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api