<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Categorías</h2>
      <button
        @click="openCreate"
        class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + Nueva Categoría
      </button>
    </div>

    <!-- Spinner -->
    <AppSpinner v-if="store.loading" />

    <!-- Alert error global -->
    <AppAlert v-else-if="store.error" :message="store.error" type="error" />

    <!-- Tabla -->
    <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Nombre</th>
            <th class="px-4 py-3">Descripción</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.items.length === 0">
            <td colspan="5" class="px-4 py-6 text-center text-gray-400">No hay categorías registradas.</td>
          </tr>
          <tr v-for="category in store.items" :key="category.id" class="hover:bg-gray-50 transition">
            <td class="px-4 py-3 text-gray-500">{{ category.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-800">{{ category.name }}</td>
            <td class="px-4 py-3 text-gray-600">{{ category.description ?? '—' }}</td>
            <td class="px-4 py-3">
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                category.is_active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              ]">
                {{ category.is_active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-2">
                <button
                  @click="openEdit(category)"
                  class="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                >
                  Editar
                </button>
                <button
                  @click="confirmDelete(category)"
                  class="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  Eliminar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear / Editar -->
    <AppModal v-model="showModal" :title="selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'">
      <CategoryForm
        :category="selectedCategory"
        @saved="onSaved"
        @cancel="showModal = false"
      />
    </AppModal>

    <!-- Modal Confirmar Eliminar -->
    <AppModal v-model="showDeleteModal" title="Confirmar eliminación">
      <p class="text-sm text-gray-600 mb-6">
        ¿Estás seguro de eliminar <span class="font-semibold">{{ selectedCategory?.name }}</span>? Esta acción no se puede deshacer.
      </p>
      <div class="flex justify-end gap-2">
        <button
          @click="showDeleteModal = false"
          class="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
        <button
          @click="handleDelete"
          :disabled="store.loading"
          class="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition"
        >
          {{ store.loading ? 'Eliminando...' : 'Eliminar' }}
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import AppSpinner from '../ui/AppSpinner.vue'
import AppAlert from '../ui/AppAlert.vue'
import AppModal from '../ui/AppModal.vue'
import CategoryForm from './CategoryForm.vue'

const store = useCategoryStore()

const showModal       = ref(false)
const showDeleteModal = ref(false)
const selectedCategory = ref(null)

onMounted(() => store.fetchAll())

function openCreate() {
  selectedCategory.value = null
  showModal.value = true
}

function openEdit(category) {
  selectedCategory.value = category
  showModal.value = true
}

function confirmDelete(category) {
  selectedCategory.value = category
  showDeleteModal.value = true
}

async function handleDelete() {
  const result = await store.destroy(selectedCategory.value.id)
  if (result.success) {
    showDeleteModal.value = false
    selectedCategory.value = null
  }
}

function onSaved() {
  showModal.value = false
  selectedCategory.value = null
}
</script>