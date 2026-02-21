import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor 
http.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Error de red / servidor caído
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Verifica tu conexión.',
        status: null,
      })
    }

    const { status, data } = error.response

    if (status === 422) {
      // Errores de validación → los maneja cada store directamente
      return Promise.reject({ message: data.message, errors: data.errors, status })
    }

    if (status === 404) {
      return Promise.reject({ message: data.message ?? 'Recurso no encontrado.', status })
    }

    if (status >= 500) {
      return Promise.reject({ message: 'Error interno del servidor.', status })
    }

    return Promise.reject({ message: data.message ?? 'Error inesperado.', status })
  }
)

export default http