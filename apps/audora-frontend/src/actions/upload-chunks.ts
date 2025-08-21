'use server';

import { API_URL } from '@/config';
import axios from 'axios';

export const uploadChunks = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/recording/chunks`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
