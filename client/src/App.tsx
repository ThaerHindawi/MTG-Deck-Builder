import './App.css'
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CardPage from "./components/Card/CardPage";
import Search from "./components/Search/Search";
import CardsPage from "./components/Card/CardsPage";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
// import RequireAuth from "./components/services/RequireAuth";
import { useContext, useEffect, useState } from "react";
// import { isLoggedInContext } from "./components/hooks/useIsLoggedIn";
// import { AuthProvider } from "./components/hooks/useIsLoggedIn";
import Routes from "./Routes";
import { AuthProvider, isLoggedInContext } from "./hooks/useIsLoggedIn";
import { checkLogin } from "./services/checkLogin";


function App() {
  useEffect(() => {
    checkLogin().then(val => console.log(val))
  }, []);

  return (
    <BrowserRouter>
      <div className="application">
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
