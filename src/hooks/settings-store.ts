import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemePreference = "light" | "dark";

interface ThemeState {
  themePreference: ThemePreference;
  getTheme: () => ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

interface UserSettingsState {
  advancedSubmitEnabled: boolean;
  setAdvancedSubmitEnabled: (setting: boolean) => void;
  tachiApiKey: string;
  setApiKey: (key: string) => void;
  isApiKeySet: () => boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themePreference: "light" as ThemePreference,
      getTheme: () => get().themePreference,
      setTheme: (theme: ThemePreference) =>
        set({ ...get(), themePreference: theme }),
      toggleTheme: () => {
        const newTheme = get().themePreference === "light" ? "dark" : "light";
        set({ ...get(), themePreference: newTheme });
      },
    }),
    {
      name: "preferred-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserSettingsStore = create<UserSettingsState>()(
  persist(
    (set, get) => ({
      advancedSubmitEnabled: false,
      setAdvancedSubmitEnabled: (advancedSubmitEnabled: boolean) =>
        set({ ...get(), advancedSubmitEnabled }),
      tachiApiKey: "",
      setApiKey: (key: string) => set({ ...get(), tachiApiKey: key }),
      isApiKeySet: () => get().tachiApiKey.trim().length > 0,
    }),
    {
      name: "user-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
