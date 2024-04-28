/* eslint-disable */
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/index";

const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  return () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
};

export { useLogout }; 