import { PageTitles } from "../shared/page-titles";
import { BasePage } from "../shared/base-page";

const ViewScoresPage = () => {
  return (
    <BasePage>
      <PageTitles
        title="View Scores"
        subtitle="View and search for submitted scores"
      />
    </BasePage>
  );
};

export default ViewScoresPage;
