import {useSearchParams} from "react-router";
import classes from "../classes.module.css";
function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status) => {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className={classes['filter-text']}>
      <label htmlFor="statusFilter">Show</label>
      <select
      className={classes['filter-input']}
        id="statusFilter"
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;
