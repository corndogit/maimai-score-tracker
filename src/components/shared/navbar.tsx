import { faJugDetergent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

export const PageNav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon
            icon={faJugDetergent}
            className="me-2"
          ></FontAwesomeIcon>
          Maimai Score Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/submit">
              Submit
            </Nav.Link>
            <Nav.Link as={Link} to="/view">
              View
            </Nav.Link>
            <Nav.Link as={Link} to="export">
              Export
            </Nav.Link>
            <Nav.Link as={Link} to="import">
              Import
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/user/settings">
                Settings
              </NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/user/logout">
                Logout
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/help">
                Help
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about">
                About
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
