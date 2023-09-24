import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("username");
    // const userToken = JSON.parse(tokenString);
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem("username", userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
