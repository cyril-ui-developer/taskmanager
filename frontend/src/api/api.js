import axios from 'axios';

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/v1' : '/',
};

const axiosInstance = axios.create(axiosParams);

const api = (axios) => {
  return {
    get: (url, config = {}) =>
      axios.get(url, config),
    delete: (url, config) =>
      axios.delete(url, config = {}),
    post: (url, body, config) =>
      axios(url, body, config),
    patch: (url, body, config= {}) =>
      axios(url, body, config),
    put: (url, body, config= {}) =>
      axios.put(url, body, config),
  };
};

export default api(axiosInstance);