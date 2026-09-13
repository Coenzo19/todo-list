import {NavLink} from "react-router";
import {useAuth} from "../contexts/AuthContext.jsx";
export default function Navigation() {
  const {isAuthenticated} = useAuth();

  function navLinkStyle({isActive}) {
    return isActive
      ? {fontWeight: "bold", textDecoration: "underline"}
      : {};
  }
  return (
    <nav>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          padding: 0
        }}
      >
        <li>
          <NavLink style={navLinkStyle} to="/about">
            About
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink style={navLinkStyle} to="/todos">
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyle} to="/profile">
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink style={navLinkStyle} to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
