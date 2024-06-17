import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
},
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if ( response?.data?.accessToken ) {
      const accessToken = `Bearer ${response.data.accessToken}`
      if(accessToken) {
        window.localStorage.setItem('accessToken', accessToken)  
      }
    } 
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.status === 401) {
      // Xóa accessToken khỏi localStorage khi nhận được lỗi 401
      localStorage.removeItem('accessToken');
      // Có thể thêm logic chuyển hướng đến trang đăng nhập tại đây nếu cần
      window.location.href = '/login'; 
  }
    return Promise.reject(error);
  }
);

export default instance;
