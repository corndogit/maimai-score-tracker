import { useRouteError } from "react-router";
import { BasePage } from "./base-page";
import { NewTabLink } from "./utils/new-tab-link";
import { Alert } from "react-bootstrap";

const env = import.meta.env;

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <BasePage>
      <h1>Oops, something bad happened &#128561;</h1>
      <p>
        If you have time, please fill out a new issue on{" "}
        <NewTabLink href="https://github.com/corndogit/maimai-score-tracker/issues/new">
          GitHub issues
        </NewTabLink>{" "}
        including a screenshot of this page and a summary of what you were doing
        when this happened.
      </p>
      {error instanceof Error ? (
        <Alert variant="danger">
          <pre>
            <code>{env.DEV ? error.stack : error.message}</code>
          </pre>
        </Alert>
      ) : (
        "Unknown error, check dev tools."
      )}
    </BasePage>
  );
};
