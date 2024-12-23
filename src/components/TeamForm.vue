<script setup lang="ts">
import { ref } from 'vue';
import type { Team } from '../types';
import { teamApi } from '../api';

const props = defineProps<{
  team?: Team;
  onSave: () => void;
}>();

const name = ref(props.team?.name || '');
const description = ref(props.team?.description || '');
const error = ref<string | null>(null);

const handleSubmit = async () => {
  try {
    const teamData = {
      name: name.value,
      description: description.value,
    };

    if (props.team) {
      await teamApi.update(props.team.id, teamData);
    } else {
      await teamApi.create(teamData);
    }
    props.onSave();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save team';
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
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea v-model="description" rows="3" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
    </div>

    <button type="submit" 
            class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      {{ props.team ? 'Update' : 'Create' }} Team
    </button>
  </form>
</template>