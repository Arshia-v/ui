import axios from 'axios';
import type { Employee, Team } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const employeeApi = {
  getAll: () => api.get<Employee[]>('/employees').then(res => res.data),
  create: (employee: Omit<Employee, 'id'>) => api.post<Employee>('/employees', employee).then(res => res.data),
  update: (id: number, employee: Partial<Employee>) => api.put<Employee>(`/employees/${id}`, employee).then(res => res.data),
  delete: (id: number) => api.delete(`/employees/${id}`).then(res => res.data)
};

export const teamApi = {
  getAll: () => api.get<Team[]>('/teams').then(res => res.data),
  create: (team: Omit<Team, 'id' | 'member_count'>) => api.post<Team>('/teams', team).then(res => res.data),
  update: (id: number, team: Partial<Team>) => api.put<Team>(`/teams/${id}`, team).then(res => res.data),
  delete: (id: number) => api.delete(`/teams/${id}`).then(res => res.data)
};