import classes from "../classes.module.css";
export default function FilterInput({filterTerm, onFilterChange}) {
  return (
    //add sanitation
    <div className={classes["search-todos"]}>
      <label htmlFor="filterInput">Search todos:</label>
      <input
      className={classes["search-todos-input"]}
        type="text"
        id="filterInput"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
      />
    </div>
  );
}
