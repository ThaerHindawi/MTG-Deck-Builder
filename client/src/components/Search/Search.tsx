import { useEffect, useState } from "react";
import CardsPage from "../Card/CardsPage";
import { useSearchParams } from "react-router-dom";
import { ICards } from "../Interfaces/ICards";
import Loader from "../Loader/Loader";
import PrivateFetch from "../../services/PrivateFetch";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const pageNumber: number = parseInt(searchParams.get("page") || "") || 1;
  const [cards, setCards] = useState<ICards>();
  const [currentPage, setCurrentPage] = useState<number>(
    pageNumber <= 0 ? 1 : pageNumber
  );

  const [isLoading, setIsLoading] = useState(true);

  const API_URL = (query: string = "", pageNumber: number = 1) => {
    let params = "";
    let order = "name";
    if (searchParams.get("order") === "set") {
      params = "unique=prints";
      order = "set";
    }
    console.log(params);
    return `https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&format=json&order=${order}&page=${pageNumber}&q=${encodeURIComponent(
      query
    )}&${params}`;
  };

  useEffect(() => {
    fetchCardsHandler();
  }, [pageNumber]);

  async function fetchCardsHandler() {
    try {
      await PrivateFetch("POST", "search/save", {
        input: query
      });
      const res = await fetch(API_URL(query, pageNumber));
      const data = await res.json();
      const transformedCards: ICards = {
        total_cards: data.total_cards,
        has_more: data.has_more,
        cards: data.data,
      };
      console.log(transformedCards);

      setCards(transformedCards);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isLoading? (
        <Loader />
      ) : (
        <>
          {cards?.cards ? (
            <CardsPage
              cards={cards}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          ) : (
            <p>No cards In This Page</p>
          )}
        </>
      )}
    </>
  );
}

export default Search;
