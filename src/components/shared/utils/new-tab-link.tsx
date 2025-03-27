import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};
export const NewTabLink = ({ href, children }: Props) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
