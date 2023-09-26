import React, { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { ICard } from "../Interfaces/ICard";

import './Card.Page.css'

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
            <div className="card-name">
            <h2>{card?.name}</h2>
            <h3>{card?.set_name}</h3>
          </div>
          </div>
          <div className="card-detail">
            <h3>Card Details</h3>
            <div className="detail-container">
            <ul className="list-details">
              <li><strong>Name: </strong> {card?.name}</li>
              <li><strong>Type: </strong> {card?.type_line}</li>
              <li><strong>Power:</strong> {card?.power}</li>
              <li><strong>Toughness: </strong> {card?.toughness}</li>
              <li><strong>Colors: </strong> {card?.colors}</li>
              <li><strong>Rarity: </strong> {card?.rarity }</li>
              <li><strong>Set Name: </strong> {card?.set_name}</li>
              <li><strong>Release Date: </strong> {card?.released_at}</li>
              <li><strong>Artist: </strong> {card?.artist}</li>
              <li><strong>Language: </strong> {card?.lang}</li>
              <div className="keywords">
                {card?.keywords.map((keyword) => {
                return (
                <span key={keyword} className="keyword">
                <strong>Keywords: </strong> {keyword}
                </span>
              );
            })}
          </div>
            </ul>
            <button type="submit" className="add-to-deck">Add to Deck</button>
          </div>
          
          </div>
          

         
        </div>
      </div>
    </main>
  );
}

export default CardPage;
