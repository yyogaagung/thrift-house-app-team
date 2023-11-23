import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { logout } from "../action";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { access_token: token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const { exp } = jwt_decode(token);
      if (exp < Date.now() / 1000) {
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
