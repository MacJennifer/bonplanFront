import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonDelete from "../../components/buttons/ButtonDelete";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsResponse = await axios.get(
          "http://127.0.0.1:8000/api/comments"
        );
        setComments(commentsResponse.data);

        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/users"
        );
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (commentId, userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`);
      // Supprimer le commentaire
      setComments(comments.filter((comment) => comment.id !== commentId));
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      // Supprimer l'utilisateur
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <NavigationAdmin />
      <h2 className="text-center mb-4 display-4">Commentaires</h2>
      {/* <ButtonAdd go="/admin/AddComment" /> */}
      <div className="row">
        {comments.map((comment) => (
          <div className="col-md-4" key={comment.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{comment.comment}</Card.Title>
                <p>
                  Utilisateur :{" "}
                  {users.find((user) => user.id === comment.user_id)?.name}
                </p>
                <ButtonDelete
                  onClick={() => handleDelete(comment.id, comment.user_id)}
                />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
