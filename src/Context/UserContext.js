import { createContext, useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
