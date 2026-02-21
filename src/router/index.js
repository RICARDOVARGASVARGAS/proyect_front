import { createRouter, createWebHistory } from 'vue-router'
import DashboardView  from '../views/DashboardView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import ProductsView   from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',           name: 'dashboard',  component: DashboardView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/products',   name: 'products',   component: ProductsView },
  ],
})

export default router