import { useLayoutEffect } from "react";
import { RouterProvider } from "react-router";
import { useThemeStore } from "./hooks/settings-store";
import { router } from "./router";
import "./App.css";

function App() {
  const themeStore = useThemeStore();
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      themeStore.getTheme()
    );
  }, [themeStore]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
