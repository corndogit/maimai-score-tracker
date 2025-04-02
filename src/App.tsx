import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { ExportScoresPage } from "./components/export-scores-page/export-scores-page";
import { HelpPage } from "./components/help-page/help-page";
import HomePage from "./components/home-page/home-page";
import { ImportScoresPage } from "./components/import-scores-page/import-scores-page";
import { SettingsPage } from "./components/settings-page/settings-page";
import { PageNav } from "./components/shared/navbar";
import { PlaceholderPage } from "./components/shared/placeholder-page";
import { SubmitScorePage } from "./components/submit-score-page/submit-score-page";
import { ViewScoresPage } from "./components/view-scores-page/view-scores-page";
import { useThemeStore } from "./hooks/settings-store";

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
      <BrowserRouter>
        <PageNav />
        <Routes>
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page not found"
                subtitle="Please check the URL and try again"
              />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitScorePage />} />
          <Route path="/view" element={<ViewScoresPage />} />
          <Route path="/export" element={<ExportScoresPage />} />
          <Route path="/import" element={<ImportScoresPage />} />
          <Route path="/user/settings" element={<SettingsPage />} />
          <Route path="/user/logout" element={<PlaceholderPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/about" element={<PlaceholderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
