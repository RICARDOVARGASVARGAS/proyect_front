import { defineStore } from 'pinia'
import { ref } from 'vue'
import categoryService from '../services/categoryService'

export const useCategoryStore = defineStore('categories', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const { data } = await categoryService.list()
      items.value = data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    loading.value = true
    error.value = null
    try {
      const { data } = await categoryService.show(id)
      return data.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    loading.value = true
    error.value = null
    try {
      const { data } = await categoryService.store(payload)
      items.value.push(data.data)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, errors: err.errors ?? null }
    } finally {
      loading.value = false
    }
  }

  async function update(id, payload) {
    loading.value = true
    error.value = null
    try {
      const { data } = await categoryService.update(id, payload)
      const index = items.value.findIndex((i) => i.id === id)
      if (index !== -1) items.value[index] = data.data
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, errors: err.errors ?? null }
    } finally {
      loading.value = false
    }
  }

  async function destroy(id) {
    loading.value = true
    error.value = null
    try {
      await categoryService.destroy(id)
      items.value = items.value.filter((i) => i.id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false }
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, fetchAll, fetchOne, create, update, destroy }
})