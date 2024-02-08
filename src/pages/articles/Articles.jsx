import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonAdd from "../../components/buttons/ButtonAdd";
import ButtonDelete from "../../components/buttons/ButtonDelete";
import ButtonEdit from "../../components/buttons/ButtonEdit";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesResponse = await axios.get(
          "http://127.0.0.1:8000/api/articles"
        );
        setArticles(articlesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (articleId) => {
    try {
      await axios.delete(`http://localhost:8000/api/articles/${articleId}`);
      // Supprimer l'article
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div>
      <NavigationAdmin />
      <h2 className="text-center mb-4 display-4">Articles</h2>
      <ButtonAdd go="/admin/addArticle" />
      <div className="row">
        {articles.map((article) => (
          <div className="col-md-4" key={article.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{article.titleArticles}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <ButtonEdit go={`/admin/editArticle/${article.id}`} />
                <ButtonDelete onClick={() => handleDelete(article.id)} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
