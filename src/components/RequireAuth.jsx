import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function RequireAuth({children}) {
  const {isAuthenticated, isAuthLoading} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isAuthenticated && !isAuthLoading) {
      navigate("/login", {replace: true, state: {from: location}});
    }
  }, [isAuthenticated, navigate, isAuthLoading,location]);

  return <div>{isAuthLoading ? <h2>Loading...</h2> : children}</div>;
}
