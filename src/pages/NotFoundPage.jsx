import {Link} from "react-router";
import {useAuth} from "../contexts/AuthContext";
import classes from "../classes.module.css";
export default function NotFoundPage() {
  const {isAuthenticated} = useAuth();
  return (
    <>
      <h2 className={classes["not-found-error"]}>404: Not Found</h2>
      <div className={classes["not-found-links"]}>
        <Link className={classes["link-btn"]} to="/">
          Go Back
        </Link>
        <Link className={classes["link-btn"]} to="/about">
          About
        </Link>

        {isAuthenticated && (
          <>
            <Link className={classes["link-btn"]} to="/profile">
              Profile
            </Link>
            <Link className={classes["link-btn"]} to="/todos">
              Todos
            </Link>
          </>
        )}
      </div>
    </>
  );
}
