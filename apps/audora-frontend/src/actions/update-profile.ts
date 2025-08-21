'use server';

import axios from 'axios';
import { API_URL } from '@/config';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';

export const updateProfile = async (profileData: { name: string }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.put(
      `${API_URL}/profile/update-name`,
      {
        name: profileData.name,
      },
      {
        headers: { Authorization: `${session.user.accessToken}` },
      },
    );

    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data.user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update profile');
  }
};
