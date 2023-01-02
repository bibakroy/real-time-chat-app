import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import jwt from "jsonwebtoken";
import { UserType } from "../types";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        const { username, id } = user as UserType;
        setUser({ username, id });
      }
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
