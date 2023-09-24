import { useContext } from "react";
import API_LOCAL_URL from "../Utils/API_URL";
import { isLoggedInContext } from "../hooks/useIsLoggedIn";
import { useLocation, useNavigate } from "react-router-dom";

export async function checkLogin() {
    // const navigate = useNavigate();
    // const {username, setUsername} = useContext<IUser>(isLoggedInContext)
  const res = await fetch(API_LOCAL_URL("checkLogin"), {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  // setUsername(data.username)
  console.log("data.username: " + data.username);
  if (data.username) {
    localStorage.setItem("username", data.username);
  }else {
      localStorage.removeItem("username");
      // navigate("/login");
  }
  return data.username;
}


