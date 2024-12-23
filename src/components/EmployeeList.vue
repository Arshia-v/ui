<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Employee } from '../types';
import { employeeApi } from '../api';
import { handleError } from '../utils/errorHandler';
import EmployeeForm from './EmployeeForm.vue';

const employees = ref<Employee[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const showForm = ref(false);
const editingEmployee = ref<Employee | null>(null);

const fetchEmployees = async () => {
  loading.value = true;
  error.value = null;
  try {
    employees.value = await employeeApi.getAll();
  } catch (err) {
    error.value = handleError(err, 'fetchEmployees');
  } finally {
    loading.value = false;
  }
};

const deleteEmployee = async (id: number) => {
  try {
    await employeeApi.delete(id);
    await fetchEmployees();
  } catch (err) {
    error.value = handleError(err, 'deleteEmployee');
  }
};

const handleSave = async () => {
  showForm.value = false;
  editingEmployee.value = null;
  await fetchEmployees();
};

const startEdit = (employee: Employee) => {
  editingEmployee.value = employee;
  showForm.value = true;
};

onMounted(fetchEmployees);
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Employees</h2>
      <button @click="showForm = !showForm" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        {{ showForm ? 'Cancel' : 'Add Employee' }}
      </button>
    </div>

    <div v-if="showForm" class="mb-4">
      <EmployeeForm 
        :employee="editingEmployee"
        @save="handleSave" 
      />
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="grid gap-4">
      <div v-for="employee in employees" :key="employee.id" 
           class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold">{{ employee.name }}</h3>
            <p class="text-gray-600">{{ employee.position }}</p>
            <p class="text-sm">{{ employee.email }}</p>
            <p class="text-sm">{{ employee.phone }}</p>
            <p class="text-sm mt-2">
              Team: {{ employee.team_name || 'Not Assigned' }}
            </p>
          </div>
          <div class="space-x-2">
            <button @click="startEdit(employee)" 
                    class="text-indigo-600 hover:text-indigo-800">
              Edit
            </button>
            <button @click="deleteEmployee(employee.id)" 
                    class="text-red-600 hover:text-red-800">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>