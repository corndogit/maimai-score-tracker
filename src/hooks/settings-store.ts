import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemePreference = "light" | "dark";

interface SettingsState {
  themePreference: ThemePreference;
  getTheme: () => ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<SettingsState>()(
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
