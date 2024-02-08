import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonAdd from "../../components/buttons/ButtonAdd";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import ButtonEdit from "../../components/buttons/ButtonEdit";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await axios.get(
        "http://127.0.0.1:8000/api/categories"
      );
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };
  const handleDelete = async (categorieId) => {
    await axios
      .delete(`http://localhost:8000/api/categories/${categorieId}`)
      .then(fetchCategories);
  };

  return (
    <div>
      <NavigationAdmin />
      <h2 className="text-center mb-4 display-4">Categories</h2>
      <ButtonAdd go="/admin/addCategorie" />
      <div className="row">
        {categories.map((categorie) => (
          <div className="col-md-4" key={categorie.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{categorie.nameCategories}</Card.Title>
                <ButtonEdit go={`/admin/editCategorie/${categorie.id}`} />
                <ButtonDelete onClick={() => handleDelete(categorie.id)} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
