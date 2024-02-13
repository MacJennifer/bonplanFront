import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import NavigationAdmin from "../../components/NavigationAdmin";
import ButtonDelete from "../../components/buttons/ButtonDelete";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userssResponse = await axios.get(
          "http://127.0.0.1:8000/api/users"
        );
        setUsers(userssResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      // Supprimer de l'utilisateur
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting utilisateur:", error);
    }
  };
  return (
    <div>
      <NavigationAdmin />
      <h2 className="text-center mb-4 display-4">Utilisateur</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user.id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Text>
                  <div>
                    <span>Nom : {user.name}</span>
                  </div>
                  <div>
                    <span>Email : {user.email}</span>
                  </div>
                </Card.Text>
                <ButtonDelete onClick={() => handleDelete(user.id)} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
