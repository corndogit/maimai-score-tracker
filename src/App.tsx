import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./components/home-page/home-page";
import { PageNav } from "./components/shared/navbar";
import { ViewScoresPage } from "./components/view-scores-page/view-scores-page";
import { SubmitScorePage } from "./components/submit-score-page/submit-score-page";
import { ImportScoresPage } from "./components/import-scores-page/import-scores-page";
import { ExportScoresPage } from "./components/export-scores-page/export-scores-page";
import "./App.css";

function App() {
  return (
    <>
      <PageNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitScorePage />} />
          <Route path="/view" element={<ViewScoresPage />} />
          <Route path="/export" element={<ExportScoresPage />} />
          <Route path="/import" element={<ImportScoresPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
