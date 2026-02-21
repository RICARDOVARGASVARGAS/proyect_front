<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <AppAlert :message="alert.message" :type="alert.type" />

    <AppInput
      label="Nombre"
      v-model="form.name"
      placeholder="Nombre del producto"
      :error="errors.name?.[0]"
    />

    <AppInput
      label="Descripción"
      v-model="form.description"
      type="textarea"
      placeholder="Descripción del producto"
      :error="errors.description?.[0]"
    />

    <AppInput
      label="Precio"
      v-model="form.price"
      type="number"
      placeholder="0.00"
      :error="errors.price?.[0]"
    />

    <AppInput
      label="Stock"
      v-model="form.stock"
      type="number"
      placeholder="0"
      :error="errors.stock?.[0]"
    />

    <AppCheckbox label="Activo" v-model="form.is_active" />

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
      >
        Cancelar
      </button>
      <button
        type="submit"
        :disabled="store.loading"
        class="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {{ store.loading ? "Guardando..." : "Guardar" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import { useProductStore } from "../../stores/productStore";
import AppAlert from "../ui/AppAlert.vue";
import AppInput from "../ui/AppInput.vue";
import AppCheckbox from "../ui/AppCheckbox.vue";

const props = defineProps({
  product: { type: Object, default: null },
});

const emit = defineEmits(["cancel", "saved"]);

const store = useProductStore();

const form = ref({
  name: "",
  description: "",
  price: "",
  stock: "",
  is_active: true,
});

const errors = ref({});
const alert = ref({ message: null, type: "error" });

watch(
  () => props.product,
  (val) => {
    if (val) {
      form.value = {
        name: val.name,
        description: val.description,
        price: val.price,
        stock: val.stock,
        is_active: val.is_active,
      };
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

function validate() {
  errors.value = {};
  if (!form.value.name || form.value.name.trim().length < 3) {
    errors.value.name = [
      "El nombre es requerido y debe tener al menos 3 caracteres.",
    ];
  }
  if (!form.value.price || Number(form.value.price) <= 0) {
    errors.value.price = ["El precio es requerido y debe ser mayor a 0."];
  }
  if (
    form.value.stock === "" ||
    form.value.stock === null ||
    Number(form.value.stock) < 0
  ) {
    errors.value.stock = ["El stock es requerido y debe ser 0 o mayor."];
  }
  return Object.keys(errors.value).length === 0;
}

async function handleSubmit() {
  errors.value = {};
  alert.value = { message: null, type: "error" };

  if (!validate()) return;

  const result = props.product
    ? await store.update(props.product.id, form.value)
    : await store.create(form.value);

  if (result.success) {
    alert.value = {
      message: "Producto guardado correctamente.",
      type: "success",
    };
    resetForm();
    emit("saved");
  } else {
    if (result.errors) errors.value = result.errors;
    alert.value = { message: store.error, type: "error" };
  }
}

function resetForm() {
  form.value = {
    name: "",
    description: "",
    price: "",
    stock: "",
    is_active: true,
  };
  errors.value = {};
  alert.value = { message: null, type: "error" };
}
</script>
