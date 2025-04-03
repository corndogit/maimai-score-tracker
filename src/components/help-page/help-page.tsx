import { Accordion, Image } from "react-bootstrap";
import { Link } from "react-router";
import step1 from "../../assets/help/api-key/step1.png";
import step2 from "../../assets/help/api-key/step2.png";
import step3 from "../../assets/help/api-key/step3.png";
import exampleImport from "../../data/example_import.json";
import { BasePage } from "../shared/base-page";
import { PageTitles } from "../shared/page-titles";
import { NewTabLink } from "../shared/utils/new-tab-link";
import { HelpPageSection } from "./help-page-section/help-page-section";
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
        <HelpPageSection id="score-import" title="Tachi score import">
          <p>
            It is possible to <Link to="/import">import scores</Link> from an
            existing JSON file that conforms to the format used by Kamaitachi.
          </p>

          <Accordion className="mb-4">
            <Accordion.Item eventKey="0-0">
              <Accordion.Header>Click to see JSON example</Accordion.Header>
              <Accordion.Body>
                <pre>
                  <code>{JSON.stringify({ ...exampleImport }, null, 2)}</code>
                </pre>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ul>
            <li>
              The <code>scores</code> list must be a list of <code>score</code>{" "}
              objects. For the required fields, please refer to the{" "}
              <NewTabLink href="https://docs.tachi.ac/game-support/games/maimai-Single/">
                Kamaitachi API reference.
              </NewTabLink>{" "}
              Invalid scores are filtered out and shown in the browser
              console/dev tools (e.g. F12 in Chrome desktop).
            </li>
            <li>
              The <code>meta</code> object can be ignored, as the tool will
              generate this metadata by itself.
            </li>
            <li>
              The <code>classes</code> object is optional, as this is set from
              the Settings page.
            </li>
          </ul>
        </HelpPageSection>
        <HelpPageSection id="tachi-api-key" title="Tachi API key setup">
          <p>
            By setting an API key, you can export your scores directly to
            Kamaitachi.
          </p>
          <Accordion className="mb-4">
            <Accordion.Item eventKey="1-0">
              <Accordion.Header>Click to see instructions</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>
                    Go to {"Kamaitachi > My Integrations"}
                    <Image
                      fluid
                      className="d-block"
                      style={{ maxWidth: "100%" }}
                      src={step1}
                    />
                  </li>
                  <li>
                    Click "Create new API key"
                    <Image
                      fluid
                      className="d-block"
                      style={{ maxWidth: "100%" }}
                      src={step2}
                    />
                  </li>
                  <li>
                    Enter a name for your key, select the permission{" "}
                    <code>submit_score</code> and create the key.
                    <Image
                      fluid
                      className="d-block"
                      style={{ maxWidth: "100%" }}
                      src={step3}
                    />
                  </li>
                  <li>
                    Click the key to reveal it, then paste the full value into
                    the Tachi API Key box in the Settings page.
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </HelpPageSection>
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
