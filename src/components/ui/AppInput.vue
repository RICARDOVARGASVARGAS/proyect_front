<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full rounded-md border px-3 py-2 text-sm outline-none transition',
        error
          ? 'border-red-500 focus:ring-2 focus:ring-red-300'
          : 'border-gray-300 focus:ring-2 focus:ring-blue-300',
      ]"
    ></textarea>
    <input
      v-else
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full rounded-md border px-3 py-2 text-sm outline-none transition',
        error
          ? 'border-red-500 focus:ring-2 focus:ring-red-300'
          : 'border-gray-300 focus:ring-2 focus:ring-blue-300',
      ]"
    />
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  error: { type: String, default: null },
  rows: { type: Number, default: 3 },
});
defineEmits(["update:modelValue"]);
</script>
