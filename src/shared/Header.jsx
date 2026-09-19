import Navigation from "./Navigation";
import classes from "../classes.module.css";
import Logoff from "../features/Logoff";
import { useAuth } from "../contexts/AuthContext";
export default function Header() {
  const {isAuthenticated}=useAuth();

  return (
    <div className={classes["header-container"]}>
      <h1 className={classes["header"]}>Todo List</h1>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </div>
  );
}
