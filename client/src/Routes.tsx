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

type Props = {};

function wait(ms: number) {
  let start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

const PrivateRoutes = () => {
  
  const { username, setUsername } = useContext<IUser>(isLoggedInContext);
  
 

  console.log(checkLogin())
  // wait(1000);

  const localUsername = localStorage.getItem("username");
  console.log("PrivateRoutes: " + localUsername)
  if (!localUsername && !username) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = (props: Props) => {
  const { username } = useContext<IUser>(isLoggedInContext);
  // console.log(username)
  // const { token, setToken } = useToken();

  const localUsername = localStorage.getItem("username");
  console.log("localUsername: " + localUsername);

  return (
    <Router>
      <Route element={<PrivateRoutes />}>          
      
      <Route
        path="decks/new"
        element={
          <>
            <AddDeck />
          </>
        }
      />
    
    
      {["decks/:id?", "decks/member/:id"].map((path) => {
        return (
          <Route
            key={path}
            path={path}
            element={
              <>
                <Decks />
              </>
            }
          />
        );
      })}
      </Route>
      <Route path="/" element={<Home />}>
        <Route
          path="/home"
          element={
            <>
              <Home />
            </>
          }
        />
      </Route>
      <Route
        path="search"
        element={
          <>
            <Search />
          </>
        }
      />
      <Route
        path="cards/:number"
        element={
          <>
            <CardsPage />
          </>
        }
      />
      <Route
        path="card/:id"
        element={
          <>
            <CardPage />
          </>
        }
      />

      {/* {!token && <Route path="login" element={<Login setToken={setToken} />} />} */}

      <Route
        path="login"
        element={!localUsername && !username ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="register"
        element={
          localUsername ? (
            <Navigate to="/" />
          ) : (
            <>
              <Register />
            </>
          )
        }
      />
    </Router>
  );
};

export default Routes;
