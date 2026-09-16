import Navigation from "./Navigation";
import classes from "../classes.module.css";
export default function Header() {
  

  return (
    <div className={classes["header-container"]}>
      <h1 className={classes["header"]}>To-do List with React</h1>
      <Navigation />
    </div>
  );
}
