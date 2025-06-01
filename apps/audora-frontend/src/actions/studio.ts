import axios from 'axios';
import { UpdateStudioSettingSchema, UpdateStudioSetting } from '@audora/types';
import { API_URL } from '@/config';

/**
 * Create a studio
 */
export const createStudio = async (studioName: string, accessToken: string) => {
  try {
    const response = await axios.post(
      '/studio/create',
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
      '/studio/update',
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
export const deleteStudio = async (studioId: string, accessToken: string) => {
  try {
    const response = await axios.post(
      '/studio/delete',
      { studioId },
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
    throw new Error('Failed to delete studio');
  }
};

/**
 * Get studio by ID
 */
export const getStudioById = async (studioId: string, accessToken: string) => {
  try {
    const encodedId = encodeURIComponent(studioId);
    const response = await axios.get(`${API_URL}/studio/get/${encodedId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get studio by id');
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
      '/studio/update-setting',
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
