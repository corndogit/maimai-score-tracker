import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { NewTabLink } from "../shared/utils/new-tab-link";
import { HelpPageSection } from "./help-page-section";
import "./help-page.css";

export const HelpPage = () => {
  return (
    <BasePage>
      <PageTitles
        title="Help"
        subtitle="Section under construction. Feedback appreciated!"
      />
      <main>
        <div id="contents-links">
          <h3>Contents</h3>
          <ol>
            <li>
              <a href="#wtf">What is this?</a>
            </li>
            <li>
              <a href="#how">How do I use this?</a>
            </li>
            <li>
              <a href="#score-import">Tachi score import</a>
            </li>
            <li>
              <a href="#tachi-api-key">Tachi API key setup</a>
            </li>
            <li>
              <a href="#feedback">Feedback & Contributing</a>
            </li>
          </ol>
        </div>
        <HelpPageSection id="wtf" title="What is this?">
          <p>
            This website is a tool for keeping track of offline maimai FiNALE
            scores for locations where a network is not available. Scores can be
            added in the Submit page and basic validation is run to confirm that
            the score is valid. Scores can be viewed in the View page which
            shows all other scores that have been added.
          </p>
          <p>
            The main feature of this site is the ability to export scores as a
            JSON in a format compatible for uploading to Kamaitachi, enabling
            better stats and network-agnostic leaderboards to compare against
            all other maimai players. The scores JSON is generated automatically
            and can be downloaded to a file, copied to clipboard or posted
            directly to Kamaitachi if your API key is set.
          </p>
        </HelpPageSection>
        <HelpPageSection id="how" title="How do I use this?">
          <p>The basic workflow is as follows:</p>
          <ul>
            <li>Add a score on the Submit scores page</li>
            <li>
              Set dan rank and Tachi API key on the Settings page (Optional)
            </li>
            <li>Go to the Export page and access your score JSON</li>
          </ul>
          <p>
            The main feature of this site is the ability to export scores as a
            JSON in a format compatible for uploading to Kamaitachi, enabling
            better stats and network-agnostic leaderboards to compare against
            all other maimai players. The scores JSON is generated automatically
            and can be downloaded to a file, copied to clipboard or posted
            directly to Kamaitachi if your API key is set.
          </p>
        </HelpPageSection>
        <HelpPageSection
          id="score-import"
          title="Tachi score import"
        ></HelpPageSection>
        <HelpPageSection
          id="tachi-api-key"
          title="Tachi API key setup"
        ></HelpPageSection>
        <HelpPageSection id="feedback" title="Feedback & Contributing">
          <p>
            This tool is a work-in-progress and still in development. Any
            feedback or bug reports can be submitted on the{" "}
            <NewTabLink href="https://github.com/corndogit/maimai-score-tracker/issues">
              GitHub issues
            </NewTabLink>{" "}
            page. PRs are also welcome if you spot anything that needs
            immediately addressing and you know how to fix it!
          </p>
        </HelpPageSection>
      </main>
    </BasePage>
  );
};
