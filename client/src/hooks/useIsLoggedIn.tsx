import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

export const isLoggedInContext = createContext<IToken>({
  token: "",
  setToken: () => {},
});

export function useIsLoggedIn() {
  const user = useContext(isLoggedInContext);

  if (user === undefined) {
    throw new Error("user is not authenticated");
  }

  return user;
}

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState();
  return (
    <isLoggedInContext.Provider value={{ token, setToken }}>
      {children}
    </isLoggedInContext.Provider>
  );
}
