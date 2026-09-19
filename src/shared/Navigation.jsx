import {NavLink} from "react-router";
import {useAuth} from "../contexts/AuthContext.jsx";
import Logoff from "../features/Logoff";
import classes from "../classes.module.css";
export default function Navigation() {
  const {isAuthenticated} = useAuth();

  function navLinkStyle({isActive}) {
    return isActive
      ? {
          fontWeight: "bold",
          textDecoration: "underline",
          color: "#91AC67",
          padding: "0 15px"
        }
      : {textDecoration: "none", color: "#8B9A6E", padding: "0 15px"};
  }
  return (
    <div>
      <nav>
        <ul className={`${classes["navList"]} `}>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink style={navLinkStyle} to="/todos">
                  Todos
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/profile">
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={navLinkStyle} to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink style={navLinkStyle} to="/login">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
