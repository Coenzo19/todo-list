import {NavLink} from "react-router";
import {useAuth} from "../contexts/AuthContext.jsx";
import Logoff from "../features/Logoff";
import classes from "../classes.module.css";
export default function Navigation() {
  const {isAuthenticated} = useAuth();

  function navLinkStyle({isActive}) {
    return isActive ? {fontWeight: "bold", textDecoration: "underline",color:'#fcecd8'} : {textDecoration: "none",color:'#fcecd8'};
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
              {isAuthenticated && <Logoff />}
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
