import { BrowserRouter, Route, Routes } from "react-router";
import SubmitScorePage from "./components/submit-score-page/submit-score-page";
import ViewScoresPage from "./components/view-scores-page/view-scores-page";
import HomePage from "./components/home-page/home-page";
import "./App.css";
import { PageNav } from "./components/shared/navbar";

function App() {
  return (
    <>
      <PageNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitScorePage />} />
          <Route path="/view" element={<ViewScoresPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
