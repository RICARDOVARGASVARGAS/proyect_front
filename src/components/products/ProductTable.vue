<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Productos</h2>
      <button
        @click="openCreate"
        class="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + Nuevo Producto
      </button>
    </div>

    <AppSpinner v-if="store.loading" />

    <AppAlert v-else-if="store.error" :message="store.error" type="error" />

    <div v-else class="overflow-x-auto rounded-lg border border-gray-200">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Nombre</th>
            <th class="px-4 py-3">Descripción</th>
            <th class="px-4 py-3">Precio</th>
            <th class="px-4 py-3">Stock</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.items.length === 0">
            <td colspan="7" class="px-4 py-6 text-center text-gray-400">
              No hay productos registrados.
            </td>
          </tr>
          <tr
            v-for="product in store.items"
            :key="product.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-4 py-3 text-gray-500">{{ product.id }}</td>
            <td class="px-4 py-3 font-medium text-gray-800">
              {{ product.name }}
            </td>
            <td class="px-4 py-3 text-gray-600">
              {{ product.description ?? "—" }}
            </td>
            <td class="px-4 py-3 text-gray-800">S/ {{ product.price }}</td>
            <td class="px-4 py-3 text-gray-800">{{ product.stock }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  product.is_active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ product.is_active ? "Activo" : "Inactivo" }}
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <div class="flex justify-center gap-2">
                <button
                  @click="openEdit(product)"
                  class="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                >
                  Editar
                </button>
                <button
                  @click="confirmDelete(product)"
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

    <AppModal
      v-model="showModal"
      :title="selectedProduct ? 'Editar Producto' : 'Nuevo Producto'"
    >
      <ProductForm
        :product="selectedProduct"
        @saved="onSaved"
        @cancel="showModal = false"
      />
    </AppModal>

    <AppModal v-model="showDeleteModal" title="Confirmar eliminación">
      <p class="text-sm text-gray-600 mb-6">
        ¿Estás seguro de eliminar
        <span class="font-semibold">{{ selectedProduct?.name }}</span
        >? Esta acción no se puede deshacer.
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
          {{ store.loading ? "Eliminando..." : "Eliminar" }}
        </button>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../../stores/productStore";
import AppSpinner from "../ui/AppSpinner.vue";
import AppAlert from "../ui/AppAlert.vue";
import AppModal from "../ui/AppModal.vue";
import ProductForm from "./ProductForm.vue";

const store = useProductStore();

const showModal = ref(false);
const showDeleteModal = ref(false);
const selectedProduct = ref(null);

onMounted(() => store.fetchAll());

function openCreate() {
  selectedProduct.value = null;
  showModal.value = true;
}

function openEdit(product) {
  selectedProduct.value = product;
  showModal.value = true;
}

function confirmDelete(product) {
  selectedProduct.value = product;
  showDeleteModal.value = true;
}

async function handleDelete() {
  const result = await store.destroy(selectedProduct.value.id);
  if (result.success) {
    showDeleteModal.value = false;
    selectedProduct.value = null;
  }
}

function onSaved() {
  showModal.value = false;
  selectedProduct.value = null;
}
</script>
