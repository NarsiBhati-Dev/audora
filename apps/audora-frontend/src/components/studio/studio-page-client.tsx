'use client';

import { useEffect } from 'react';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { getStudioNameFromSlug } from '@/lib/studio/getStudioNameFromSlug';
import {
  renderGuestJoining,
  renderGuestLanding,
  renderHostView,
} from './render-view';
import { useIsDesktop } from '@/hooks/useIsDesktop';

interface StudioPageClientProps {
  studio: string;
  isHost: boolean;
  isGuestLanding: boolean;
  isGuestJoining: boolean;
  hostName: string | undefined;
}

const StudioPageClient = ({
  studio,
  isHost,
  isGuestLanding,
  isGuestJoining,
  hostName,
}: StudioPageClientProps) => {
  const { setStudioSetting } = useStudioSettingsStore();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (studio) {
      setStudioSetting({
        studioId: studio,
        name: getStudioNameFromSlug(studio),
      });
    }
  }, [studio, setStudioSetting]);

  // If welcome token is present, show welcome screen
  if (isGuestLanding) return renderGuestLanding();

  // If guest token is present, show join as guest screen
  if (isGuestJoining) return renderGuestJoining();

  // If host token is present, show host view
  if (isHost) return renderHostView(hostName, isDesktop);

  return null;
};

export default StudioPageClient;
