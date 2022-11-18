import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
export const ProtectRoutes = ({ children }) => {
  const user = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  } else return children;
};
