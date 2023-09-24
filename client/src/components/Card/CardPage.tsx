import React, { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { ICard } from "../Interfaces/ICard";

interface Props {
  card?: ICard;
}

function CardPage({ card: defaultCard }: Props) {
  const match = useMatch("card/:id");
  const CARD_ID = match?.params.id;

  const [card, setCard] = useState<ICard>(defaultCard!);

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function fetchMoviesHandler() {
    const res = await fetch(
      `https://api.scryfall.com/cards/${CARD_ID}`
    );
    const data = await res.json();
    const transformedCard : ICard = data;
    setCard(transformedCard);
    
  }

  return (
    <main>
      <div className="card-profile">
        <div className="card-profile__flex">
          <div className="card-image">
            <img src={card?.image_uris?.normal} alt={card?.name} />
          </div>
          <div className="card-name">
            <h1>{card?.name}</h1>
          </div>

          <div className="keywords">
            {card?.keywords.map((keyword) => {
              return (
                <span key={keyword} className="keyword">
                  {keyword}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default CardPage;
