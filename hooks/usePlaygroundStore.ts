import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PlaygroundState {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const usePlaygroundStore = create<PlaygroundState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'playground-storage', // localStorageのキー名
      storage: createJSONStorage(() => localStorage),
    }
  )
);
