import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";

const EditCategorie = () => {
  const { categorieId } = useParams();
  const navigate = useNavigate();

  const [nameCategories, setNameCategories] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getCategorie();
  }, []);

  const getCategorie = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/categories/${categorieId}`)
      .then((res) => {
        setNameCategories(res.data[0].nameCategories);
        // console.log(res.data[0].nameCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCategorie = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("nameCategories", nameCategories);

    await axios
      .post(`http://127.0.0.1:8000/api/categories/${categorieId}`, formData)
      .then(() => navigate("/admin/categories"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <NavigationAdmin />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier une catégorie</h4>
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
                  <Form onSubmit={updateCategorie}>
                    <Row>
                      <Col>
                        <Form.Group controlId="nameCategories">
                          <Form.Label>Nom</Form.Label>
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
                      Modifier
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

export default EditCategorie;
