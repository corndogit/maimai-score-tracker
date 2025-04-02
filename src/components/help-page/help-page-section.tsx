import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  id: string;
  title: string;
};
export const HelpPageSection = ({ children, id, title }: Props) => {
  return (
    <section className="mb-4" id={id}>
      <h4>{title}</h4>
      {children ?? <p>TBC</p>}
      <a href="#contents-links">Top</a>
    </section>
  );
};
