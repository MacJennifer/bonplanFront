import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavigationAdmin() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Accueil
            </Link>
          </Nav>
          <Nav className="me-auto">
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              Tableau de bord
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationAdmin;
