import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import NavigationAdmin from "../components/NavigationAdmin";

const Admin = () => {
  return (
    <div>
      <NavigationAdmin />
      <Container className="mt-5">
        <h2 className="text-center mb-4 display-4">Tableau de bord</h2>
        <Row>
          <Col md={3}>
            <Link to="/admin/articles" style={{ textDecoration: "none" }}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>Articles</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3}>
            <Link to="/admin/places" style={{ textDecoration: "none" }}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>Places</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3}>
            <Link to="/admin/categories" style={{ textDecoration: "none" }}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>Catégories</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3}>
            <Link to="/admin/comments" style={{ textDecoration: "none" }}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>Commentaires</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={3}>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <Card className="text-center mb-4">
                <Card.Body>
                  <Card.Title>Utilisateurs</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
