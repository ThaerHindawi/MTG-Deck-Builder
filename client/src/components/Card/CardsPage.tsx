import { Outlet, Link } from "react-router-dom";
import { ICards } from "../Interfaces/ICards";

import "./Cards.Page.css";
import { ButtonHTMLAttributes } from "react";

interface Props {
  cards?: ICards;
  searchParams?: URLSearchParams;
  setSearchParams?: Function;
}

function CardsPage({ cards, searchParams, setSearchParams }: Props) {
  const query = searchParams?.get("q") || "";
  const pageNumber: number = parseInt(searchParams?.get("page") || "") || 1;

  function next(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isNaN(pageNumber)) {
      searchParams?.set("page", pageNumber + 1 + "");
    }
    if (setSearchParams) setSearchParams(searchParams);
  }

  function prev(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!isNaN(pageNumber)) {
      searchParams?.set("page", pageNumber - 1 + "");
    }
    if (setSearchParams) setSearchParams(searchParams);
  }

  // console.log(cards?.cards[0].image_uris.large)
  return (
    <section className="container">
      <hr />
      <p>{cards?.total_cards} Cards found in search result</p>
      <hr />
      <div className="cards">
        {cards?.cards.map((card) => {
          if (card.image_uris?.normal) {
            return (
              <div className="card" id={card.id} key={card.id}>
                <Link to={`/card/${card.id}`}>
                  <img src={card.image_uris?.normal} alt={card.name} />
                </Link>
              </div>
            );
          }
        })}
      </div>
      <div className="pagination">
        <button disabled={pageNumber <= 1} onClick={prev} className="prev">
          previous
        </button>
        <button disabled={!cards?.has_more} onClick={next} className="next">
          next
        </button>
      </div>
    </section>
  );
}

export default CardsPage;
