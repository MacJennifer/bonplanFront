import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Tableau de bord</h2>
      <Row>
        <Col md={3}>
          <h3>
            <Link to="/admin/articles">Articles</Link>
          </h3>
        </Col>
        <Col md={3}>
          <h3>
            <Link to="/admin/places">Places</Link>
          </h3>
        </Col>
        <Col md={3}>
          <h3>
            <Link to="/admin/categories">Catégories</Link>
          </h3>
        </Col>
        <Col md={3}>
          <h3>
            <Link to="/admin/comments">Commentaires</Link>
          </h3>
        </Col>
        <Col md={3}>
          <h3>
            <Link to="/admin/users">Utilisateurs</Link>
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
