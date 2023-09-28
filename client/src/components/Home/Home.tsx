import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const search = useRef(null);

  function searchCard(e: FormEvent) {
    e.preventDefault();
    console.log(query);
    navigate(`/search?q=${query}&page=1`);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  // async function logout() {
  //   await fetch();
  // }

  return (
    <main>
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
      </div>
    </main>
  );
}

export default Home;
