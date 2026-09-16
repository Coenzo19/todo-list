import classes from "../classes.module.css";
export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange
}) {
  return (
    <>
      <div className={classes['filter-text']}>
        <label htmlFor="sortBy">Sort by</label>
        <select
        className={classes['filter-input']}
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          id="sortBy"
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className={classes['filter-text']}>
        <label htmlFor="order">Order</label>
        <select
        className={classes['filter-input']}
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
          id="order"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </>
  );
}
