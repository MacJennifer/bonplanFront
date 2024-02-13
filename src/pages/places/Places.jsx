// Importez le useEffect, useState et CardGroup depuis react-bootstrap
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonAdd from "../../components/buttons/ButtonAdd";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import ButtonEdit from "../../components/buttons/ButtonEdit";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesResponse = await axios.get(
          "http://127.0.0.1:8000/api/places"
        );
        setPlaces(placesResponse.data);

        const categoriesResponse = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (placeId) => {
    try {
      await axios.delete(`http://localhost:8000/api/places/${placeId}`);
      setPlaces(places.filter((place) => place.id !== placeId));
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  };

  return (
    <div>
      <NavigationAdmin />
      <h2 className="text-center mb-4 display-4">Bon Plan</h2>
      <ButtonAdd go="/admin/addPlace" />
      <CardGroup>
        {places.map((place) => {
          const category = categories.find(
            (category) => category.id === place.categorie_id
          );
          return (
            <div className="col-md-4" key={place.id}>
              <Card className="mb-4">
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                  <Card.Title>{place.namePlace}</Card.Title>
                  <Card.Text>
                    <div>
                      <strong>Adresse:</strong> {place.adressPlaces}
                    </div>
                    <div>
                      <strong>Code Postal:</strong> {place.zipCodePlaces}
                    </div>
                    <div>
                      <strong>Téléphone:</strong> {place.phonePlaces}
                    </div>
                    <div>
                      <strong>Catégorie:</strong>{" "}
                      {category ? category.nameCategories : "Non spécifié"}
                    </div>
                  </Card.Text>
                  <ButtonEdit go={`/admin/editPlace/${place.id}`} />
                  <ButtonDelete onClick={() => handleDelete(place.id)} />
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    </div>
  );
};

export default Places;
