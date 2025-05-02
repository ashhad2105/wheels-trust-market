import axios from 'axios';
// const apiKey = import.meta.env.VITE_API_KEY;

const API_URL ='http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// export const login = async (email, password) => {
//   try {
//     const response = await api.post('/auth/login', { email, password });
//     if (response.token) {
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//     return response;
//   } catch (error) {
//     throw error.response?.data || { message: 'Login failed' };
//   }
// };
export const login = async (email, password) => {
    try {
      const { token, success } = await api.post('/auth/login', { email, password });
  
      if (!token || !success) {
        throw new Error('Invalid login response');
      }
  
      localStorage.setItem('token', token);
      return { token };
    } catch (error) {
      console.error('Login error:', error);
      throw error?.response?.data || { message: 'Login failed' };
    }
  };
  
export const register = async (name, email, password, role = 'user') => {
  try {
    const response = await api.post('/auth/register', { name, email, password, role });
    // console.log('Login response:', { token, success });
    console.log('Registration response:', response);    

    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export default api; 