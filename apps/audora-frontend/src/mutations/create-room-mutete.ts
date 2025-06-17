import { createStudio } from '@/actions/studio';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const useCreateStudioMutation = () => {
  const router = useRouter();
  const { setAllSettings } = useStudioSettingsStore();

  return useMutation({
    mutationFn: async (studioName: string) => {
      const response = await createStudio(studioName);
      return response;
    },
    onSuccess: data => {
      if (data.success) {
        // Update all studio settings with the new studio data
        setAllSettings({
          studioSetting: {
            studioSlug: data.studio.studioSlug,
            studioName: data.studio.studioName,
            enableLobby: data.studio.enableLobby,
            language: data.studio.language,
          },
          studioRecordingSetting: {
            recordingType: data.studio.recordingType,
            audioSampleRate: data.studio.audioSampleRate,
            videoQuality: data.studio.videoQuality,
            noiseReduction: data.studio.noiseReduction,
            countdownBeforeRecording: data.studio.countdownBeforeRecording,
            autoStartOnGuestJoin: data.studio.autoStartOnGuestJoin,
            pauseUploads: data.studio.pauseUploads,
          },
        });
        toast.success('Studio created successfully');
        router.push('/dashboard/home');
      } else {
        toast.error('Failed to create studio');
      }
    },
    onError: () => {
      toast.error('Failed to create studio');
    },
  });
};
