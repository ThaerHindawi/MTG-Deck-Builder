import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

export const isLoggedInContext = createContext<IUser>({
  username: "",
  setUsername: () => {},
});

export function useIsLoggedIn() {
  const user = useContext(isLoggedInContext);

  if (user === undefined) {
    throw new Error("user is not authenticated");
  }

  return user;
}

export  function AuthProvider({ children }: Props) {
  const [username, setUsername] = useState("");
  return (
    <isLoggedInContext.Provider value={{ username, setUsername }}>
      {children}
    </isLoggedInContext.Provider>
  );
}

