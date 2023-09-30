import { useEffect, useState } from "react";
import CardsPage from "../Card/CardsPage";
import { useSearchParams } from "react-router-dom";
import { ICards } from "../Interfaces/ICards";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const pageNumber: number = parseInt(searchParams.get("page") || "") || 1;

  const [cards, setCards] = useState<ICards>();
  const [currentPage, setCurrentPage] = useState<number>(
    pageNumber <= 0 ? 1 : pageNumber
  );

  const API_URL = (query: string = "", pageNumber: number = 1) => {
    return `https://api.scryfall.com/cards/search?format=json&order=name&page=${pageNumber}&q=${encodeURIComponent(query)}`;
  };

  useEffect(() => {
    fetchCardsHandler();
  }, [pageNumber]);

  async function fetchCardsHandler() {
    try {
      const res = await fetch(API_URL(query, pageNumber));
      const data = await res.json();
      const transformedCards: ICards = {
        total_cards: data.total_cards,
        has_more: data.has_more,
        cards: data.data,
      };
      console.log(transformedCards);

      setCards(transformedCards);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     {cards?.cards ? <CardsPage cards={cards} searchParams= {searchParams} setSearchParams={setSearchParams} /> : <p>No cards In This Page</p>} 
    </>
  );
}

export default Search;
