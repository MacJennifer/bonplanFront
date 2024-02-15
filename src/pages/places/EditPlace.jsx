import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import NavigationAdmin from "../../components/NavigationAdmin";

const EditPlace = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [namePlace, setNamePlace] = useState("");
  const [adressPlaces, setAdressPlaces] = useState("");
  const [zipCodePlaces, setZipCodePlaces] = useState("");
  const [phonePlaces, setPhonePlaces] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [categories, setCategories] = useState([]);
  const [validationError, setValidationError] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    getPlace();
    getCategories();
  }, []);

  const getPlace = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/places/${placeId}`
      );
      const {
        namePlace,
        adressPlaces,
        zipCodePlaces,
        phonePlaces,
        categorie_id,
        image,
      } = response.data;
      setNamePlace(namePlace);
      setAdressPlaces(adressPlaces);
      setZipCodePlaces(zipCodePlaces);
      setPhonePlaces(phonePlaces);
      setCategorieId(categorie_id);
      setImage(image);
    } catch (error) {
      console.error("Error fetching place:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  };
  const updatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("namePlace", namePlace);
    formData.append("adressPlaces", adressPlaces);
    formData.append("zipCodePlaces", zipCodePlaces);
    formData.append("phonePlaces", phonePlaces);
    formData.append("categorie_id", categorie_id);
    formData.append("image", image);

    try {
      await axios.post(`http://127.0.0.1:8000/api/places/${placeId}`, formData);
      navigate("/admin/places");
    } catch (error) {
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Error updating place:", error);
      }
    }
  };

  return (
    <div>
      <NavigationAdmin />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier une adresse</h4>
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
                      <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form onSubmit={updatePlace}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleArticles">
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
                        <Form.Group controlId="description">
                          <Form.Label>Adresse</Form.Label>
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
                          <Form.Label>Adresse</Form.Label>
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
                          <Form.Label>Téléphone</Form.Label>
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
                        <Form.Group controlId="club_id">
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

export default EditPlace;
