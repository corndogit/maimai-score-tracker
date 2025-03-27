import { ReactNode } from "react";
import { Container } from "react-bootstrap";

type BasePageProps = {
  children: ReactNode;
};

export const BasePage = ({ children }: BasePageProps) => {
  return <Container className="p-5">{children}</Container>;
};
