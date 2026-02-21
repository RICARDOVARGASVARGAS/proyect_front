<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-300 cursor-pointer"
    />
    <label v-if="label" :for="id" class="text-sm text-gray-700 cursor-pointer">{{ label }}</label>
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  id:         { type: String,  default: () => `checkbox-${Math.random().toString(36).slice(2)}` },
  label:      { type: String,  default: null },
  modelValue: { type: Boolean, default: false },
  error:      { type: String,  default: null },
})
defineEmits(['update:modelValue'])
</script>