import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { accessToken: action.payload };
    case "LOGOUT":
      return { accessToken: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    accessToken: null,
  });

  const navigate = useNavigate(); // Importer useNavigate

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch({ type: "LOGIN", payload: accessToken });
    } else {
      navigate("/"); 
    }
  }, [navigate]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};