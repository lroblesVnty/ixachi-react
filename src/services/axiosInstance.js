import axios from 'axios'
const apiIxachi = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api',
    
});

/*let isRefreshing = false; // Bandera para evitar múltiples refrescos concurrentes
let failedQueue = []; // Cola de peticiones fallidas esperando un nuevo token

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiIxachi.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('authToken'); // O de tu AuthContext
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      // Aquí podrías añadir una lógica para verificar si el token está *a punto* de expirar
      // y si es así, intentar refrescarlo proactivamente.
      // Sin embargo, la estrategia de respuesta 401 suele ser más robusta.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiIxachi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es un 401 y no es una petición para refrescar el token, y no ha sido reintentada
    if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh-token')) {
      if (isRefreshing) {
        // Si ya estamos refrescando, añadir la petición actual a la cola
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return apiIxachi(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true; // Marcar como reintentada
      isRefreshing = true;

      try {
        // Llama a tu endpoint de refresco de token (asume que devuelve nuevo access_token)
        const response = await axios.post('/refresh-token', {
          // Si el refresh token no está en HttpOnly cookie, lo enviarías aquí
          refreshToken: localStorage.getItem('refresh_token'),
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('access_token', newAccessToken); // Guarda el nuevo token

        isRefreshing = false;
        processQueue(null, newAccessToken); // Procesar cola de peticiones fallidas

        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        return apiIxachi(originalRequest); // Reintentar la petición original
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null); // Indicar a las peticiones en cola que hubo un error

        // Si el refresh token también falla (ej. 401), significa que la sesión es inválida
        localStorage.removeItem('authToken');
        localStorage.removeItem('refresh_token'); // Asegúrate de limpiar todo
        // Redirigir al login (o notificar al AuthContext para que lo haga)
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
*/
export default apiIxachi;