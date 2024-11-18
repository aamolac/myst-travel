import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MystDest() {
  // État local pour stocker les destinations mystères récupérées
  const [mystDests, setMystDests] = useState([]);

  const navigate = useNavigate();
  // Pour gérer les messages de retour
  const [msg, setMsg] = useState("");

  // Fonction de mappage pour convertir le statut en valeur numérique
  const getStatusValue = (statusLabel) => {
    switch (statusLabel) {
      case "En ligne":
        return 0;
      case "Hors ligne":
        return 1;
      default:
        return 0;
    }
  };

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

  // Fonction pour mettre à jour le statut d'une destination
  const updateStatus = async (id, newStatusLabel) => {
    // Convertit le label en entier
    const newStatus = getStatusValue(newStatusLabel);

    const response = await fetch(
      `http://localhost:9000/api/v1/myst-dest/updateStatus/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (response.ok) {
      // Actualise la liste après la mise à jour
      fetchMystDest();
    } else {
      setMsg("Erreur lors de la mise à jour du statut");
    }
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

      {msg && <p className="message">{msg}</p>}
      <button onClick={() => navigate(`/dashboard/myst-destination/add`)}>
        Ajouter une destination mystère
      </button>
      <table>
        <thead>
          <tr>
            <th>Numéro de la destination</th>
            <th>Titre</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mystDests.map((mystDest) => (
            <tr key={mystDest.id}>
              <td>{mystDest.id}</td>
              <td>{mystDest.title}</td>
              <td>{mystDest.status}</td>
              <td>
                {getStatusValue(mystDest.status) === 0 && (
                  <button
                    onClick={() => updateStatus(mystDest.id, "Hors ligne")}
                  >
                    Hors ligne
                  </button>
                )}
                {getStatusValue(mystDest.status) === 1 && (
                  <button onClick={() => updateStatus(mystDest.id, "En ligne")}>
                    En ligne
                  </button>
                )}
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
