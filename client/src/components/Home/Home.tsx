import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import { ICard } from "../Interfaces/ICard";
import Loader from "../Loader/Loader";
import PrivateFetch from "../../services/PrivateFetch";

interface searchRequest {
  id?: number;
  input: string;
  count?: number;
}

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const search = useRef(null);
  const [cards, setCards] = useState<ICard[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [searchResult, setSearchResult] = useState<searchRequest[]>();
  const [top10Searches, setTop10Searches] = useState<searchRequest[]>();

  function searchCard(e: FormEvent) {
    e.preventDefault();
    console.log(query);
    navigate(`/search?q=${query}&page=1`);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  async function randomCard() {
    const res = await fetch(`https://api.scryfall.com/cards/random`);
    const data = await res.json();
    return data;
  }

  async function handleRandomCard() {
    const data = await randomCard();
    navigate(`/card/${data.id}`);
  }

  async function getSearchRequests() {
    const res = await PrivateFetch("GET", "search/requests", null);
    setSearchResult(res);
  }

  async function getTop10Searches() {
    const res = await PrivateFetch("GET", "search/top10", null);
    setTop10Searches(res);
  }

  useEffect(() => {
    let randoms: Promise<ICard>[] = [];
    for (let i = 0; i < 5; i++) {
      randoms.push(randomCard());
    }
    Promise.all(randoms).then((values) => {
      setCards(values);
      setIsLoading(false);
    });

    getSearchRequests();
    getTop10Searches();
  }, []);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          {/* <button onClick={logout}>logout</button> */}
          <h1 className="homepage-title">MTG Deck Builder</h1>

          <form onSubmit={searchCard} id="form" className="home-search__form">
            <input
              ref={search}
              type="text"
              className="search"
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon={Icons.faSearch} />
            </button>
          </form>

          <button onClick={handleRandomCard} className="btn" type="button">
            Random Card
          </button>

          <div className="home-cards">
            {cards?.map((card) => {
              if (card.image_uris?.normal) {
                return (
                  <div className="home-card" id={card.id} key={card.id}>
                    <Link to={`/card/${card.id}`}>
                      <img src={card.image_uris?.normal} alt={card.name} />
                    </Link>
                  </div>
                );
              }
            })}
          </div>

          <div className="search_results">
            <table className="decks-table">
              <thead>
                <tr>
                  <th>Last Search Results</th>
                </tr>
              </thead>
              <tbody>
                {searchResult?.length && searchResult?.map((result) => {
                  return (
                    <tr key={result.id}>
                      <td><Link to={`/search?q=${result.input}`}>{result.input}</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table className="decks-table">
              <thead>
                <tr>
                  <th>TOP 10 Searches</th>
                  <th>Search Count</th>
                </tr>
              </thead>
              <tbody>
                {searchResult?.length && top10Searches?.map((result) => {
                  return (
                    <tr key={10 * Math.random() * Math.random()}>
                      <td><Link to={`/search?q=${result.input}`}>{result.input}</Link></td>
                      <td><Link to={`/search?q=${result.input}`}>{result?.count}</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
