import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";

export default function RequireAuth({children}) {
  const {isAuthenticated} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {replace: true, state: {from: location}});
    }
  }, [isAuthenticated, navigate, location]);

  return <div>{!isAuthenticated ? <h2>Loading</h2> : children}</div>;
}
