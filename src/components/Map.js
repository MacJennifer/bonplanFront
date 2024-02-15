import axios from "axios";
import { Icon, divIcon, point } from "leaflet"; //
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

function Map() {
  const [places, setPlaces] = useState([]);
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesResponse = await axios.get(
          "http://127.0.0.1:8000/api/places"
        );
        setPlaces(placesResponse.data);

        // const categoriesResponse = await axios.get(
        //   "http://127.0.0.1:8000/api/categories"
        // );
        // setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const markets = [
    {
      geocode: [49.25697995467097, 4.026473467432394],
      popUp: "Restaurant Edito Reims",
      id: 6,
    },
    {
      geocode: [49.25553744701421, 4.02793258910499],
      popUp: "Restaurant Famille Mary Reims",
      id: 5,
    },
    {
      geocode: [49.255164937189804, 4.027573282750139],
      popUp: "Restaurant Le Tablier Reims ",
      id: 4,
    },
    {
      geocode: [49.25399956852702, 4.034068857671764],
      popUp: "Cathédrale de Reims ",
      id: 3,
    },
    {
      geocode: [49.24324458647598, 4.042041033988635],
      popUp: "Basilique Saint-Rémi",
      id: 2,
    },
    {
      geocode: [49.247212484573694, 4.023949493254751],
      popUp: "Stade de Reims",
      id: 24,
    },
    {
      geocode: [49.243180862318596, 4.024810811447914],
      popUp: "Complexe René Tys",
      id: 25,
    },
  ];

  const customIcon = (categorie) => {
    // Créer et retourner un nouvel objet Icon en utilisant la catégorie fournie
    return new Icon({
      iconUrl: iconCategorie(categorie),
      iconSize: [23, 23],
    });
  };

  const iconCategorie = (categorie) => {
    switch (categorie) {
      case 1:
        return require("../assets/images/fourchette.png");
      case 2:
        return require("../assets/images/banque.png");
      case 3:
        return require("../assets/images/stade.png");
      case 4:
        return require("../assets/images/complexe.png");
      default:
        return require("../assets/images/market-map.png");
    }
  };

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  return (
    <MapContainer center={[49.2531, 4.0346]} zoom={15}>
      <TileLayer
        attribute='&copy;  <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markets.map((market) => {
          const place = places.find((place) => place.id === market.id);
          const categorie = place ? place.categorie_id : null;
          return (
            <Marker
              key={market.id}
              position={market.geocode}
              icon={customIcon(categorie)}
            >
              {place && (
                <Popup>
                  <div>
                    <img
                      src={`http://localhost:8000/storage/uploads/${place.image}`}
                      alt={place.namePlace}
                      className="imgPop"
                    />
                  </div>
                  <h2>{place.namePlace}</h2>
                  <p>{place.adressPlaces}</p>
                  <p>{place.phonePlaces}</p>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
