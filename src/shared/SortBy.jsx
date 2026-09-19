import classes from "../classes.module.css";
export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange
}) {
  return (
    <>
      <div>
        <div>
          <label htmlFor="sortBy" className={classes["filters-text"]}>
            Sort by
          </label>
          <select
            className={classes["filters-input"]}
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            id="sortBy"
          >
            <option value="createdAt">Created At</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div>
          <label htmlFor="order" className={classes["filters-text"]}>
            Order
          </label>
          <select
            className={classes["filters-input"]}
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            id="order"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </>
  );
}
