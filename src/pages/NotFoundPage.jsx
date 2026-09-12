import {Link} from "react-router";
import {useAuth} from "../contexts/AuthContext";
export default function NotFoundPage() {
  const {isAuthenticated} = useAuth();
  return (
    <div>
      <h2>404: Not Found</h2>
      <Link className="linkButton" to="/">
        Go Back
      </Link>
      <Link className="linkButton" to="/about">
        About
      </Link>

      {isAuthenticated && (
        <>
          <Link className="linkButton" to="/profile">
            Profile
          </Link>
          <Link className="linkButton" to="/todos">
            Todos
          </Link>
        </>
      )}
    </div>
  );
}
