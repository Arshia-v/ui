<script setup lang="ts">
import { ref } from 'vue';
import type { Employee } from '../types';
import { employeeApi } from '../api';

const props = defineProps<{
  employee?: Employee;
  onSave: () => void;
}>();

const name = ref(props.employee?.name || '');
const email = ref(props.employee?.email || '');
const phone = ref(props.employee?.phone || '');
const position = ref(props.employee?.position || '');
const salary = ref(props.employee?.salary || 0);
const age = ref(props.employee?.age || 0);

const error = ref<string | null>(null);

const handleSubmit = async () => {
  try {
    const employeeData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      position: position.value,
      salary: salary.value,
      age: age.value,
    };

    if (props.employee) {
      await employeeApi.update(props.employee.id, employeeData);
    } else {
      await employeeApi.create(employeeData);
    }
    props.onSave();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save employee';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input v-model="name" type="text" required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Phone</label>
      <input v-model="phone" type="tel"
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Position</label>
      <input v-model="position" type="text" required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Salary</label>
      <input v-model="salary" type="number" required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Age</label>
      <input v-model="age" type="number" required
             class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <button type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      {{ props.employee ? 'Update' : 'Create' }} Employee
    </button>
  </form>
</template>