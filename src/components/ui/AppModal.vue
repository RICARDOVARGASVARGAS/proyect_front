<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="$emit('update:modelValue', false)"
      ></div>
      <!-- Contenido -->
      <div
        class="relative z-10 bg-white rounded-lg shadow-xl w-full max-w-lg mx-4"
      >
        <!-- Header -->
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h3 class="text-lg font-semibold">{{ title }}</h3>
          <button
            @click="$emit('update:modelValue', false)"
            class="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>
        <!-- Slot -->
        <div class="px-6 py-4">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: "Modal" },
});
defineEmits(["update:modelValue"]);
</script>
