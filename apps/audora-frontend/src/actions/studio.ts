'use server';

import axios from 'axios';
import { UpdateStudioSettingSchema, UpdateStudioSetting } from '@audora/types';
import { API_URL } from '@/config';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';

/**
 * Create a studio
 */
export const createStudio = async (studioName: string, accessToken: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/studio/create`,
      { studioName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create studio');
  }
};

/**
 * Update studio name
 */
export const updateStudioName = async (
  studioId: string,
  studioName: string,
  accessToken: string,
) => {
  try {
    const response = await axios.post(
      `${API_URL}/studio/update`,
      { studioId, studioName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update studio name');
  }
};

/**
 * Delete studio
 */
export const deleteStudio = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.delete(`${API_URL}/studio/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${session.user.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete studio');
  }
};

/**
 * Get studio by ID
 */
export const getStudio = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/studio/get`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });

    return response.data.studio;
  } catch {
    return null;
  }
};

/**
 * Update studio settings
 */
export const updateStudioSetting = async (
  studioId: string,
  settingName: UpdateStudioSetting['settingName'],
  settingValue: UpdateStudioSetting['settingValue'],
  accessToken: string,
) => {
  const parsed = UpdateStudioSettingSchema.safeParse({
    settingName,
    settingValue,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  try {
    const response = await axios.post(
      `${API_URL}/studio/update-setting`,
      {
        studioId,
        settingName: parsed.data.settingName,
        settingValue: parsed.data.settingValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update studio setting');
  }
};
