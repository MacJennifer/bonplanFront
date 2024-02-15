import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";

const AddPlace = () => {
  const navigate = useNavigate();

  const [namePlace, setNamePlace] = useState("");
  const [adressPlaces, setAdressPlaces] = useState("");
  const [zipCodePlaces, setZipCodePlaces] = useState("");
  const [phonePlaces, setPhonePlaces] = useState("");
  const [comment_id, setCommentId] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [categories, setCategorie] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [image, setImage] = useState("");

  const changeHandler = (event) => {
    console.log(event);
    setImage(event.target.files[0]);
    console.log("Updated image:", event.target.files[0]);
  };

  const handleChange = (event) => {
    setCommentId(event.target.value);
    setCategorieId(event.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
      setCategorie(res.data);
    });
  };
  const addPlaces = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("namePlace", namePlace);
    formData.append("image", image);
    formData.append("adressPlaces", adressPlaces);
    formData.append("zipCodePlaces", zipCodePlaces);
    formData.append("phonePlaces", phonePlaces);
    formData.append("comment_id", comment_id);
    formData.append("categorie_id", categorie_id);

    await axios
      .post(`http://127.0.0.1:8000/api/places`, formData)
      .then(navigate("/admin/places"))
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
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Création d'une Adresse</h4>
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
                  <Row>
                    <Col>
                      <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form onSubmit={addPlaces}>
                    <Row>
                      <Col>
                        <Form.Group controlId="namePlace">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            value={namePlace}
                            onChange={(event) => {
                              setNamePlace(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="adressPlaces">
                          <Form.Label>Adresse : </Form.Label>
                          <Form.Control
                            type="text"
                            value={adressPlaces}
                            onChange={(event) => {
                              setAdressPlaces(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="zipCodePlaces">
                          <Form.Label>Code Postal : </Form.Label>
                          <Form.Control
                            type="text"
                            value={zipCodePlaces}
                            onChange={(event) => {
                              setZipCodePlaces(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="phonePlaces">
                          <Form.Label>Téléphone : </Form.Label>
                          <Form.Control
                            type="text"
                            value={phonePlaces}
                            onChange={(event) => {
                              setPhonePlaces(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="position">
                          <Form.Label>Catégorie</Form.Label>
                          <Form.Control
                            as="select"
                            value={categorie_id}
                            onChange={(e) => setCategorieId(e.target.value)}
                          >
                            {categories.map((categorie) => (
                              <option key={categorie.id} value={categorie.id}>
                                {categorie.nameCategories}
                              </option>
                            ))}
                          </Form.Control>
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

export default AddPlace;
