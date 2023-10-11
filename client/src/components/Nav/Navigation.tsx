import { NavLink } from "react-router-dom";
import mtgLogo from "../../assets/mtg-logo.png"
import "./nav-style.css";
import PrivateFetch from "../../services/PrivateFetch";
import { useContext, useState } from "react";
import { isLoggedInContext } from "../../hooks/useIsLoggedIn";

export default function Navigation() {
  const [isLogout, setIsLogout] = useState<Boolean>(false);
  const { token, setToken } = useContext<IToken>(isLoggedInContext);
  function logout() {
    localStorage.removeItem("token");
    setIsLogout(true);
    window.location.reload();
  }
  console.log("token: " + token);
  return (
    <header className="header">
      
      <div className="logo-wrapper">
       <img src={mtgLogo} alt="MTG Deck Builder logo" className="mtg-logo"/>
        <h2 className="header-logo">MTG Deck Builder</h2>
      </div>
      <nav className="site-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/decks" end>Decks</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sets">Sets</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/members">Members</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>
          {(!token && !localStorage.getItem("token")) || isLogout ? (
            <>
              <li className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/decks/new">Add Deck</NavLink>
              </li>
              <li onClick={logout} className="nav-item">
                <NavLink to="/login">Logout</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

