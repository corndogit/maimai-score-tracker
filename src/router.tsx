import { createBrowserRouter } from "react-router";
import { ExportScoresPage } from "./components/export-scores-page/export-scores-page";
import { HelpPage } from "./components/help-page/help-page";
import { HomePage } from "./components/home-page/home-page";
import { ImportScoresPage } from "./components/import-scores-page/import-scores-page";
import { SettingsPage } from "./components/settings-page/settings-page";
import { PlaceholderPage } from "./components/shared/placeholder-page";
import { SubmitScorePage } from "./components/submit-score-page/submit-score-page";
import { ViewScoresPage } from "./components/view-scores-page/view-scores-page";
import { ErrorPage } from "./components/shared/error-page";

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <PlaceholderPage
        title="Page not found"
        subtitle="Please check the URL and try again"
      />
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/submit",
    element: <SubmitScorePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view",
    element: <ViewScoresPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/export",
    element: <ExportScoresPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/import",
    element: <ImportScoresPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user/logout",
    element: <PlaceholderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/help",
    element: <HelpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <PlaceholderPage />,
    errorElement: <ErrorPage />,
  },
]);
