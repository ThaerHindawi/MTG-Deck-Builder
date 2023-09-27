import { useEffect, useState } from "react";
import CardsPage from "../Card/CardsPage";
import { Link, useMatch } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";
import useSWR from "swr";

interface Card {
  id: number;
  deck_id: number;
  api_card_id: string;
  card_name: string;
  artwork_url: string;
}

function FindCards() {
  const match = useMatch("decks/:id/cards");
  const deckId = match && match.params && match.params.id;
  const [cards, setCards] = useState<Card[]>();

  useEffect(() => {
    fetchCardsHandler();
  }, []);

  async function fetchCardsHandler() {
    const res = await PrivateFetch("GET", `/decks/${deckId}/cards`, null);
    console.log(res);
    setCards(res);
  }

  return (
    <section className="container">
      {!cards?.length && <p>No cards found</p>}
      <div className="cards">
        {!cards?.length && <p></p>}
        {cards?.length &&
          cards?.map((card) => {
            return (
              <div className="card" id={card.api_card_id} key={card.id}>
                <Link to={`/card/${card.api_card_id}`}>
                  <img src={card.artwork_url} alt={card.card_name} />
                </Link>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default FindCards;
