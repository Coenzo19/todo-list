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
    <div>
      <div>
        <label htmlFor="statusFilter" className={classes["filters-text"]}>Show</label>
        <select
          className={classes["filters-input"]}
          id="statusFilter"
          value={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All Todos</option>
          <option value="active">Active Todos</option>
          <option value="completed">Completed Todos</option>
        </select>
      </div>
    </div>
  );
}

export default StatusFilter;
