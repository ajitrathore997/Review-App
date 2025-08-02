import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getDeals = (params) => {
  return axios.get(`${API_BASE_URL}/deals`, { params });
};

export const getAssignees = () => {
  return axios.get(`${API_BASE_URL}/assignees`);
};

export const getStages = () => {
  return axios.get(`${API_BASE_URL}/stages`);
};
