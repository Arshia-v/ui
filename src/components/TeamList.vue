<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Team } from '../types';
import { teamApi } from '../api';
import { handleError } from '../utils/errorHandler';
import TeamForm from './TeamForm.vue';

const teams = ref<Team[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const showForm = ref(false);
const editingTeam = ref<Team | null>(null);

const fetchTeams = async () => {
  loading.value = true;
  error.value = null;
  try {
    teams.value = await teamApi.getAll();
  } catch (err) {
    error.value = handleError(err, 'fetchTeams');
  } finally {
    loading.value = false;
  }
};

const deleteTeam = async (id: number) => {
  try {
    await teamApi.delete(id);
    await fetchTeams();
  } catch (err) {
    error.value = handleError(err, 'deleteTeam');
  }
};

const handleSave = async () => {
  showForm.value = false;
  editingTeam.value = null;
  await fetchTeams();
};

const startEdit = (team: Team) => {
  editingTeam.value = team;
  showForm.value = true;
};

onMounted(fetchTeams);
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Teams</h2>
      <button @click="showForm = !showForm" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        {{ showForm ? 'Cancel' : 'Add Team' }}
      </button>
    </div>

    <div v-if="showForm" class="mb-4">
      <TeamForm 
        :team="editingTeam"
        @save="handleSave" 
      />
    </div>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="grid gap-4">
      <div v-for="team in teams" :key="team.id" 
           class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold">{{ team.name }}</h3>
            <p class="text-gray-600">{{ team.description }}</p>
            <p class="text-sm">Leader: {{ team.leader_name || 'Not Assigned' }}</p>
            <p class="text-sm">Members: {{ team.member_count }}</p>
          </div>
          <div class="space-x-2">
            <button @click="startEdit(team)" 
                    class="text-indigo-600 hover:text-indigo-800">
              Edit
            </button>
            <button @click="deleteTeam(team.id)" 
                    class="text-red-600 hover:text-red-800">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>