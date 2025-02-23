"use client";

import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

interface IUserContext {
  email: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
}
export const UserContext = createContext<IUserContext | null>(null);
export const useUserContext = () => {
  const user = useContext(UserContext);
  if (user === null) {
    throw new Error("useUserContext must be used with userContext");
  }
  return user;
};

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const login = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
  };
  return (
    <>
    <UserContext.Provider value={{email,token,login}}>
      {children}</UserContext.Provider></>
  )
};
export default UserProvider