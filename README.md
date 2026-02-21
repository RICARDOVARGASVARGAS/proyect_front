# SaaS Products CRUD — Frontend

Frontend del sistema de gestión de productos y categorías construido con Vue 3.

---

## Requisitos previos

- Node.js >= 18
- npm >= 9
- Backend Laravel corriendo en `http://proyect.test`

---

## Instalación y levantar el entorno
```bash
npm install
cp .env.example .env
npm run dev
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto frontend:
```
VITE_API_URL=http://proyect.test/api
```

---

## URLs base

| Servicio  | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:5173      |
| API base  | http://proyect.test/api    |

---

## Estructura del proyecto
```
src/
├── assets/
│   └── main.css
├── components/
│   ├── categories/
│   │   ├── CategoryForm.vue
│   │   └── CategoryTable.vue
│   ├── products/
│   │   ├── ProductForm.vue
│   │   └── ProductTable.vue
│   └── ui/
│       ├── AppAlert.vue
│       ├── AppCheckbox.vue
│       ├── AppInput.vue
│       ├── AppModal.vue
│       └── AppSpinner.vue
├── router/
│   └── index.js
├── services/
│   ├── categoryService.js
│   ├── endpoints.js
│   ├── http.js
│   └── productService.js
├── stores/
│   ├── categoryStore.js
│   └── productStore.js
├── views/
│   ├── CategoriesView.vue
│   ├── DashboardView.vue
│   └── ProductsView.vue
├── App.vue
└── main.js
```

---

## Stack técnico

| Tecnología   | Versión |
|--------------|---------|
| Vue          | 3.5.28  |
| Pinia        | 3.0.4   |
| Vue Router   | 5.0.2   |
| Axios        | latest  |
| Tailwind CSS | v4      |

---

## Manejo de errores

El interceptor global de Axios en `src/services/http.js` centraliza el manejo de todos los errores HTTP:

| Situación              | Comportamiento                                     |
|------------------------|----------------------------------------------------|
| Error de red           | Alerta roja: "No se pudo conectar con el servidor" |
| Validación 422         | Errores mostrados debajo de cada campo en rojo     |
| No encontrado 404      | Alerta roja con mensaje del backend                |
| Error del servidor 5xx | Alerta roja: "Error interno del servidor"          |
| Éxito                  | Alerta verde con mensaje confirmatorio             |
| Carga                  | Spinner visible mientras se procesa la petición    |

---

## Validaciones del frontend

Antes de enviar cada formulario se validan los campos localmente:

**Categorías**
- `name` → requerido, mínimo 3 caracteres

**Productos**
- `name` → requerido, mínimo 3 caracteres
- `price` → requerido, mayor a 0
- `stock` → requerido, mayor o igual a 0