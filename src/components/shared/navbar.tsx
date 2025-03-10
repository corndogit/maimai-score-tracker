import { faJugDetergent } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const PageNav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <FontAwesomeIcon
            icon={faJugDetergent}
            className="me-2"
          ></FontAwesomeIcon>
          Maimai Score Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} />
            </Nav.Link>
            <Nav.Link href="/submit">Submit</Nav.Link>
            <Nav.Link href="/view">View</Nav.Link>
            <NavDropdown title="Scores" id="scores-dropdown">
              <NavDropdown.Item href="export">Export</NavDropdown.Item>
              <NavDropdown.Item href="import">Import</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="/user/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/logout">Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/help">Help</NavDropdown.Item>
              <NavDropdown.Item href="/about">About</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
