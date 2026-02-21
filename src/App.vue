<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-200 px-6 py-3 flex gap-6">
      <RouterLink
        to="/"
        class="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        active-class="text-blue-600"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        to="/categories"
        class="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
        active-class="text-blue-600"
      >
        Categorías
      </RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>