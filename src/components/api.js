import axios from 'axios';

const api = axios.create({
  baseURL: 'https://still-refuge-14618-26151148c321.herokuapp.com/', // our API base URL
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Restful API endpoints
export const createAccount = (name, email, password) => {
  return api.get(`/account/create/${name}/${email}/${password}`);
};

export const login = (email, password) => {
  return api.get(`/account/login/${email}/${password}`);
};

export const deposit = (email, amount) => {
  return api.get(`/account/update/${email}/${amount}`);
};

export const withdraw = (email, amount) => {
  return api.get(`/account/update/${email}/-${amount}`);
};

export const getBalance = async (email) => {
  return await api.get(`/account/balance/${email}`);
};



// Export the api instance
export default api;
