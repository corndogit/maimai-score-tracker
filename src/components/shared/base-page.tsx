import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageNav } from "./navbar";

type BasePageProps = {
  children: ReactNode;
};

export const BasePage = ({ children }: BasePageProps) => {
  return (
    <>
      <PageNav />
      <Container className="p-5">{children}</Container>
    </>
  );
};
