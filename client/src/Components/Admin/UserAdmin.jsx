import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  // État local pour stocker les utilisateurs récupérées depuis l'API
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  //pour récupérer les utilisateurs
  const fetchUser = async () => {
    const response = await fetch("http://localhost:9000/api/v1/user/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    //convertit la réponse en json
    const data = await response.json();
    //mise à jour de l'état avec les utilisateurs récupérées
    setUsers(data);
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cet utilisateur avec l'identifiant ${id}?`
    );

    if (isConfirmed) {
      const response = await fetch(
        `http://localhost:9000/api/v1/user/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      // Vérifie si la suppression a été effectuée avec succès
      if (response.ok) {
        // Rechargement de la liste des utilisateurs
        fetchUser();
      } else {
        setMsg("Erreur lors de la suppression de l'utilisateur");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Liste des utilisateurs de Myst'Travel</h2>

      {msg && <p>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse mail</th>
            <th>Date de création du compte</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.createdDate}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default User;
