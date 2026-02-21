<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <AppAlert :message="alert.message" :type="alert.type" />

        <AppInput label="Nombre" v-model="form.name" placeholder="Nombre de la categoría" :error="errors.name?.[0]" />

        <AppInput label="Descripción" v-model="form.description" type="textarea"
            placeholder="Descripción de la categoría" :error="errors.description?.[0]" />

        <AppCheckbox label="Activo" v-model="form.is_active" />

        <div class="flex justify-end gap-2 pt-2">
            <button type="button" @click="$emit('cancel')"
                class="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                Cancelar
            </button>
            <button type="submit" :disabled="store.loading"
                class="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition">
                {{ store.loading ? 'Guardando...' : 'Guardar' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useCategoryStore } from '../../stores/categoryStore'
import AppAlert from '../ui/AppAlert.vue'
import AppInput from '../ui/AppInput.vue'
import AppCheckbox from '../ui/AppCheckbox.vue'

const props = defineProps({
    category: { type: Object, default: null }, // null = crear, objeto = editar
})

const emit = defineEmits(['cancel', 'saved'])

const store = useCategoryStore()

const form = ref({
    name: '',
    description: '',
    is_active: true,
})

const errors = ref({})
const alert = ref({ message: null, type: 'error' })

// Si llega una categoría para editar, llena el formulario
watch(() => props.category, (val) => {
    if (val) {
        form.value = {
            name: val.name,
            description: val.description,
            is_active: val.is_active,
        }
    } else {
        resetForm()
    }
}, { immediate: true })

async function handleSubmit() {
    errors.value = {}
    alert.value = { message: null, type: 'error' }

    const result = props.category
        ? await store.update(props.category.id, form.value)
        : await store.create(form.value)

    if (result.success) {
        alert.value = { message: 'Categoría guardada correctamente.', type: 'success' }
        resetForm()
        emit('saved')
    } else {
        if (result.errors) {
            errors.value = result.errors
        }
        alert.value = { message: store.error, type: 'error' }
    }
}

function resetForm() {
    form.value = { name: '', description: '', is_active: true }
    errors.value = {}
    alert.value = { message: null, type: 'error' }
}
</script>