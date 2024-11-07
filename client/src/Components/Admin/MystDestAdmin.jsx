import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function MystDest() {
  // État local pour stocker les destinations mystères récupérées
  const [mystDests, setMystDests] = useState([]);

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  //pour récupérer les destinations mystères
  const fetchMystDest = async () => {
    const response = await fetch(
      "http://localhost:9000/api/v1/myst-dest/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    //convertit la réponse en json
    const data = await response.json();
    //mise à jour de l'état avec les destinations mystères récupérées
    setMystDests(data);
  };

  // Fonction pour supprimer une destination mystère
  const deleteMystDest = async (id) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cette destination mystère (identifiant ${id}) ?`
    );

    if (isConfirmed) {
      const response = await fetch(
        `http://localhost:9000/api/v1/myst-dest/delete/${id}`,
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
        // Rechargement de la liste des destinations mystères
        fetchMystDest();
      } else {
        setMsg("Erreur lors de la suppression de la destination mystère");
      }
    }
  };

  // useEffect pour charger les infos lors du montage du composant
  useEffect(() => {
    fetchMystDest();
  }, []);

  return (
    <main>
      <button
        onClick={() => navigate("/dashboard")}
        title="Retour à la page du dashboard"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Retour
      </button>
      <h2>Destination mystère</h2>

      {msg && <p>{msg}</p>}
      <Link to="/dashboard/myst-destination/add">
        Ajouter une destination mystère
      </Link>
      <table>
        <thead>
          <tr>
            <th>Numéro de la destination</th>
            <th>Titre</th>
          </tr>
        </thead>
        <tbody>
          {mystDests.map((mystDest) => (
            <tr key={mystDest.id}>
              <td>{mystDest.id}</td>
              <td>{mystDest.title}</td>
              <td>
                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/myst-destination/update/${mystDest.id}`
                    )
                  }
                  title={`Aller à la page pour modifier la destination mystère ${mystDest.id}`}
                >
                  Modifier
                </button>
                <button onClick={() => deleteMystDest(mystDest.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default MystDest;
