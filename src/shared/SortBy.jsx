export default function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange
}) {
  return (
    <>
      <label htmlFor="sortBy">Sort By</label>

      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)} id="sortBy">
        <option value='createdAt'>Created At</option>
        <option value='title'>Title</option>
      </select>

      <label htmlFor="order">Order</label>

      <select
      value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
        id="order"
      >
        <option value='desc'>Descending</option>
        <option value='asc'>Ascending</option>
      </select>
    </>
  );
}
