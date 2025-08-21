'use server';

import { API_URL } from '@/config';
import axios from 'axios';

export const generateMeetingToken = async (
  studioSlug: string,
  userId: string | undefined,
  studioToken?: string | null,
) => {
  const response = await axios.post(
    `${API_URL}/meeting/generate-token`,
    {
      studioSlug,
      userId,
      studioToken,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};
