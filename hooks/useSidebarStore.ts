import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: 'sidebar-storage', // localStorageのキー名
      storage: createJSONStorage(() => localStorage),
    }
  )
);
