import authOptions from '@/lib/auth/auth-options';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export const createMeeting = async (studioId: string, hostId: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await axios.post(
    '/api/meeting/create',
    {
      studioId,
      hostId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session.user.accessToken}`,
      },
    },
  );

  return response.data;
};
