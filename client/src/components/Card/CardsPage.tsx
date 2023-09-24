import { Outlet, Link } from "react-router-dom";
import { ICards } from "../Interfaces/ICards";

import "./Cards.Page.css";

interface Props {
  cards?: ICards;
}

function CardsPage({ cards }: Props) {
    // console.log(cards?.cards[0].image_uris.large)
  return (
    <section className="container">
      <div className="cards">
        {cards?.cards.map((card) => {
          return (
            <div className="card" id={card.id} key={card.id}>
              <Link to={`/card/${card.id}`}>
                <img src={card.image_uris?.normal} alt={card.name} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardsPage;
