import { create } from 'zustand';

interface UserProfile {
  name: string;
}

interface UserProfileStore {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
}

export const useUserProfileStore = create<UserProfileStore>(set => ({
  userProfile: {
    name: '',
  },
  setUserProfile: userProfile => set({ userProfile }),
}));
