import { useEffect, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";
import { useJwt } from "react-jwt";
import "./decks.css"

interface IDeck {
  id: number;
  deck_name: string;
  created_by: number;
  date_created: number;
}

function Decks() {
  const location = useLocation();
  const [decks, setDecks] = useState<IDeck[]>([]);
  const token = localStorage.getItem("token");
  const [messageDeckDeleted, setMessageDeckDeleted] = useState<string>("");
  const { decodedToken, isExpired, reEvaluateToken } = useJwt<User>(
    token || ""
  );
  const navigate = useNavigate();
  console.log(location.pathname);
  useEffect(() => {
    handleFetchDecks();
  }, [messageDeckDeleted]);

  async function handleFetchDecks() {
    const res = await PrivateFetch("GET", location.pathname, null);

    console.log(res);
    if (res instanceof Array) {
      setDecks(res);
    } else {
      setDecks([]);
      setMessageDeckDeleted(res.error);
    }
  }

  async function deleteDeck(id: number, deck_name: string) {
    reEvaluateToken(token || "");
    if (isExpired) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
    const res = await PrivateFetch("GET", `/decks/${id}/delete`, null);
    setMessageDeckDeleted(res.message);
  }

  return (
    <div className="wrapper">
      <p>{messageDeckDeleted}</p>
      <table className="decks-table">
        <thead>
          <tr>
            <th>Deck Id</th>
            <th>Deck Name</th>
            <th>Date created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => {
            return (
              <tr key={deck.id.toString()}>
                <td>{deck.id.toString()}</td>
                <td className="deck-name">
                <Link to={`/decks/${deck.id}/cards`}>
                  {deck.deck_name}
                </Link>
                </td>
                <td>
                  {new Date(deck.date_created * 1000).toLocaleDateString()}
                </td>
                <td>
                  {decodedToken?.member_id === deck.created_by && (
                    <button className="btn" onClick={() => deleteDeck(deck.id, deck.deck_name)}>
                      delete
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Decks;
