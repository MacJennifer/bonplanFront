import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [titleArticles, setTitleArticles] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/articles/${articleId}`)
      .then((res) => {
        setTitleArticles(res.data.titleArticles);
        setDescription(res.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("titleArticles", titleArticles);
    formData.append("description", description);

    await axios
      .post(`http://127.0.0.1:8000/api/articles/${articleId}`, formData)
      .then(navigate("/admin/articles"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un article</h4>
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
                  <Form onSubmit={updateArticle}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleArticles">
                          <Form.Label>Titre</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleArticles}
                            onChange={(event) => {
                              setTitleArticles(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            value={description}
                            onChange={(event) => {
                              setDescription(event.target.value);
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

export default EditArticle;
