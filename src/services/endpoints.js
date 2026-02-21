export const ENDPOINTS = {
  products: {
    list:    '/products',
    store:   '/products',
    show:    (id) => `/products/${id}`,
    update:  (id) => `/products/${id}`,
    destroy: (id) => `/products/${id}`,
  },
  categories: {
    list:    '/categories',
    store:   '/categories',
    show:    (id) => `/categories/${id}`,
    update:  (id) => `/categories/${id}`,
    destroy: (id) => `/categories/${id}`,
  },
}