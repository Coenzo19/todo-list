import {useAuth} from "../contexts/AuthContext";
import {useState, useEffect} from "react";
import classes from "../classes.module.css";

export default function ProfilePage() {
  const {name, email, token} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [todoStats, setTodoStats] = useState({
    total: 0,
    active: 0,
    completed: 0
  });

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        return;
      }

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: {"X-CSRF-TOKEN": token},
          credentials: "include"
        };
        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const todos = await response.json();

        const total = todos.tasks.length;

        const completed = todos.tasks.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({total, completed, active});
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  return (
    <div className={classes['profile']}>
      {loading ? (
        <h2 className={classes["loading"]}>Loading...</h2>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <h2>Name:{name}</h2>
              <p>Email: {email}</p>
              <p>Total: {todoStats.total}</p>
              <p>Completed Todos: {todoStats.completed}</p>
              <p>Active Todos: {todoStats.active}</p>
              {todoStats.total !== 0 && (
                <p>
                  Completion Percentage:
                  {(todoStats.completed / todoStats.total) * 100}%
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
