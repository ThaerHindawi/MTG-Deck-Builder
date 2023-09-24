import { useEffect, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { useLocation } from "react-router-dom";

interface IDeck {
  id: number;
  deck_name: string;
  created_by: number;
  date_created: number;
}

function Decks() {
  const location = useLocation();
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [messageDeckDeleted, setMessageDeckDeleted] = useState<string>("");
console.log(location.pathname)
  useEffect(() => {
    handleFetchDecks();

    return () => {
        // setTimeout(() => {
            // setMessageDeckDeleted("");
        // }, 1000);
    }
  }, [messageDeckDeleted]);

  async function handleFetchDecks() {
    const res = await fetch(API_LOCAL_URL(location.pathname), {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    const data = await res.json();
    console.log(data);
    if(data instanceof Array) {
        setDecks(data);
    } else {
        setDecks([]);
        setMessageDeckDeleted(data.error)
        // setTimeout(() => {
        //     setMessageDeckDeleted("");
        // }, 1000);
    }
  }

  async function deleteDeck(id: number, deck_name: string) {
    const res = await fetch(API_LOCAL_URL(`decks/${id}/delete`), {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    const data = await res.json();
    console.log(data);
    setMessageDeckDeleted(deck_name + " " + data.message);
  }

  return (
    <div className="container">
        <p>{messageDeckDeleted}</p>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>id</th>
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
                <td>{deck.deck_name}</td>
                <td>{new Date(deck.date_created * 1000).toLocaleDateString()}</td>
                <td><button onClick={() => deleteDeck(deck.id, deck.deck_name)}>delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Decks;
