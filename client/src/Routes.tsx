import React, { useContext, useEffect, useState } from "react";
import {
  Routes as Router,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
// import { isLoggedInContext } from './components/hooks/useIsLoggedIn'
import Login from "./components/User/Login";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import CardsPage from "./components/Card/CardsPage";
import CardPage from "./components/Card/CardPage";
import Register from "./components/User/Register";
import API_LOCAL_URL from "./Utils/API_URL";
import { checkLogin } from "./services/checkLogin";
import { AuthProvider, isLoggedInContext } from "./hooks/useIsLoggedIn";
import AddDeck from "./components/Deck/AddDeck";
import Decks from "./components/Deck/Decks";
import useToken from "./services/useToken";
import { useJwt } from "react-jwt";
import Navigation from "./components/Nav/Navigation";
import Members from "./components/Members/Members";
import Member from "./components/Members/Member";
import FindCards from "./components/Deck/FindCards";
import ContactPage from "./components/Contact/ContactPage";

type Props = {};

const PrivateRoutes = () => {
  // const { username, setUsername } = useContext<IUser>(isLoggedInContext);
  let localToken = localStorage.getItem("token");

  const { isExpired } = useJwt(localToken || "");
  // console.log("PrivateRoutes: " + localToken);
  if (isExpired) {
    localStorage.removeItem("token");
    localToken = null;
  }
  if (!localToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  // const { username } = useContext<IUser>(isLoggedInContext);
  let localToken = localStorage.getItem("token");
  const { isExpired } = useJwt(localToken || "");
  if (isExpired) {
    localStorage.removeItem("token");
    localToken = null;
  }
  // console.log(username)
  // const { token, setToken } = useToken();

  return (
    <Router>
      <Route element={<PrivateRoutes />}>
        <Route path="decks/new" element={<AddDeck />} />
      </Route>
      {["decks/:id?", "decks/member/:id"].map((path) => {
        return <Route key={path} path={path} element={<Decks />} />;
      })}
      <Route path="/" element={<Home />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="search" element={<Search />} />
      <Route path="cards/:number" element={<CardsPage />} />
      <Route path="card/:id" element={<CardPage />} />
      <Route path="members" element={<Members />} />
      <Route path="members/:id" element={<Member />} />
      <Route path="decks/:id/cards" element={<FindCards />} />
      <Route path="contact" element={<ContactPage />} />

      <Route
        path="login"
        element={!localToken ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="register"
        element={!localToken ? <Register /> : <Navigate to="/" replace />}
      />
    </Router>
  );
};

export default Routes;
