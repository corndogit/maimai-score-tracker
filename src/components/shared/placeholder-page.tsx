import { BasePage } from "./base-page";
import { PageTitles } from "./page-titles";

interface Props {
  title?: string;
  subtitle?: string;
}

export const PlaceholderPage = ({ title, subtitle }: Props) => {
  return (
    <BasePage>
      <PageTitles
        title={title ?? "Coming soon"}
        subtitle={
          subtitle ?? "Site is under construction, please check back later."
        }
      />
    </BasePage>
  );
};
