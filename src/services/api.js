
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchVets = () => API.get('/vet');
export const fetchVetById = (id) => API.get(`/vet/${id}`);
export const addVet = (vetData) => API.post('/vet', vetData);
export const rateVet = (id, ratingData) => API.post(`/vet/${id}/rate`, ratingData);
export const bookVetSession = (id, bookingData) =>
  API.post(`/vet/${id}/book`, bookingData);
