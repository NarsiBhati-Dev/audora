import { create } from 'zustand';

interface LayoutState {
  layout: 'grid' | 'speaker-full' | 'speaker-split';
  fitMode: 'fill' | 'fit';
  setLayout: (layout: 'grid' | 'speaker-full' | 'speaker-split') => void;
  setFitMode: (fitMode: 'fill' | 'fit') => void;
}

export const useLayoutStore = create<LayoutState>(set => ({
  layout: 'grid',
  fitMode: 'fill',
  setLayout: layout => set({ layout }),
  setFitMode: fitMode => set({ fitMode }),
}));
