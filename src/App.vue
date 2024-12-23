<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue';
import TeamList from './components/TeamList.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold text-gray-900">
          Employee Management System
        </h1>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-6">
        <EmployeeList />
        <TeamList />
      </div>
    </main>
  </div>
</template>