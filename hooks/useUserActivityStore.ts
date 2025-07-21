import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ContentActivity {
  videos: {
    [contentId: string]: { playCount: number };
  };
  quizzes: {
    [contentId: string]: { clickCount: number };
  };
}

interface UserActivityState {
  contentActivity: ContentActivity;
  incrementPlayCount: (contentId: string) => void;
  incrementQuizClick: (contentId: string) => void;
}

export const useUserActivityStore = create<UserActivityState>()(
  persist(
    (set, get) => ({
      contentActivity: {
        videos: {},
        quizzes: {},
      },
      incrementPlayCount: (contentId: string) => {
        set((state) => ({
          contentActivity: {
            ...state.contentActivity,
            videos: {
              ...state.contentActivity.videos,
              [contentId]: {
                playCount: (state.contentActivity.videos[contentId]?.playCount || 0) + 1,
              },
            },
          },
        }));
      },
      incrementQuizClick: (contentId: string) => {
        set((state) => ({
          contentActivity: {
            ...state.contentActivity,
            quizzes: {
              ...state.contentActivity.quizzes,
              [contentId]: {
                clickCount: (state.contentActivity.quizzes[contentId]?.clickCount || 0) + 1,
              },
            },
          },
        }));
      },
    }),
    {
      name: 'userInfoHubActivity', // localStorageのキー名
      storage: createJSONStorage(() => localStorage),
    }
  )
);
