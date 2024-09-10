import axios from "axios";

const instance = axios.create({
    // baseURL: "https://api.api68.com",
    timeout: 5000,
});

instance.interceptors.response.use(response => {
    const {result} = response.data;
    return result.data;
}, error => {
    console.error("Error: ", error);
    return Promise.reject(error);
});



export default instance;
