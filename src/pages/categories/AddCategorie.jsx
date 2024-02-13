import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";
const AddCategorie = () => {
  const navigate = useNavigate();

  const [nameCategories, setNameCategories] = useState("");

  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de club
  const addCategories = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nameCategories", nameCategories);

    await axios
      .post(`http://127.0.0.1:8000/api/categories`, formData)
      .then(navigate("/admin/categories"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <NavigationAdmin />
      <div className="container">
        <div className="row justify-content-center mt-4">
          {" "}
          {/* Ajout de la classe mt-4 pour décaler vers le bas */}
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Création d'une catégorie</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={addCategories}>
                    <Row>
                      <Col>
                        <Form.Group controlId="nameCategories">
                          <Form.Label>Titre</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameCategories}
                            onChange={(event) => {
                              setNameCategories(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategorie;
