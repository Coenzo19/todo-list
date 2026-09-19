import classes from "../classes.module.css";
export default function FilterInput({filterTerm, onFilterChange}) {
  return (
    <div className={classes["filters-text"]}>
      <label htmlFor="filterInput">Search todos:</label>
      <input
        className={classes["filters-input"]}
        type="text"
        id="filterInput"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        maxLength={30}
      />
    </div>
  );
}
