<template>
  <div
    v-if="message"
    :class="[
      'px-4 py-3 rounded text-sm mb-4',
      type === 'success'
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800',
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: null },
  type: { type: String, default: "error" }, // 'error' | 'success'
});
</script>
