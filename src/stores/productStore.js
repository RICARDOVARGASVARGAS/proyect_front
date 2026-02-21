import { defineStore } from "pinia";
import { ref } from "vue";
import productService from "../services/productService";

export const useProductStore = defineStore("products", () => {
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await productService.list();
      console.log(data);
      items.value = data.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchOne(id) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await productService.show(id);
      return data.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  async function create(payload) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await productService.store(payload);
      items.value.push(data.data);
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, errors: err.errors ?? null };
    } finally {
      loading.value = false;
    }
  }

  async function update(id, payload) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await productService.update(id, payload);
      const index = items.value.findIndex((i) => i.id === id);
      if (index !== -1) items.value[index] = data.data;
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false, errors: err.errors ?? null };
    } finally {
      loading.value = false;
    }
  }

  async function destroy(id) {
    loading.value = true;
    error.value = null;
    try {
      await productService.destroy(id);
      items.value = items.value.filter((i) => i.id !== id);
      return { success: true };
    } catch (err) {
      error.value = err.message;
      return { success: false };
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, error, fetchAll, fetchOne, create, update, destroy };
});
