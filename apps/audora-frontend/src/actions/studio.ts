import { useStudioSettingStore } from '@/store/studio-setting';

export const updateStudioSetting = async () => {
  const { studioSetting } = useStudioSettingStore.getState();

  const response = await fetch('/api/studio', {
    method: 'PUT',
    body: JSON.stringify(studioSetting),
  });

  if (!response.ok) {
    throw new Error('Failed to update studio setting');
  }

  return response.json();
};
