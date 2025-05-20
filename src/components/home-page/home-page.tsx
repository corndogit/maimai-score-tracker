import { Image, Stack } from "react-bootstrap";
import { BasePage } from "../shared/base-page";
import { NewTabLink } from "../shared/utils/new-tab-link";
import derakkuma from "../../assets/derakkuma.png";

export const HomePage = () => {
  return (
    <BasePage>
      <h1>MaiMai FiNALE Score Tracker</h1>
      <Stack>
        <Image
          className="py-2 mx-auto"
          src={derakkuma}
          style={{ maxWidth: "300px" }}
        />
        <div>
          <h2>About</h2>
          <p>
            A score tracker for manually recording scores from offline maimai
            FiNALE. Scores are saved in your browser and can be exported as JSON
            to services such as{" "}
            <NewTabLink href="https://kamai.tachi.ac">Kamaitachi</NewTabLink>.
          </p>
          <p>
            To get started, please select an option in the navbar/dropdown menu.
          </p>
          <h2>Disclaimer</h2>
          <p>
            The tool in its current state provides a limited amount of score
            validation but it is not perfect.
          </p>
          <p>
            You are responsible for verifying the scores submitted to other
            services from this tool are correct and follow their terms of use.
            No responsibility will be taken for punishment received from
            incorrect use/abuse of this tool.
          </p>
          <h2>Feedback</h2>
          <p>
            This tool is mostly feature-complete, but still in active
            development. Any feedback or bug reports can be submitted on the{" "}
            <NewTabLink href="https://github.com/corndogit/maimai-score-tracker/issues">
              GitHub issues
            </NewTabLink>{" "}
            page.
          </p>
        </div>
      </Stack>
    </BasePage>
  );
};
