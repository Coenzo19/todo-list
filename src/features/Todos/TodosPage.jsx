import {useState, useEffect} from "react";
import TodoList from "./TodoList/TodoList.jsx";
import TodoForm from "./TodoForm.jsx";

export default function TodosPage({token}) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      const params = new URLSearchParams({
        limit: 100
      });
      try {
        setIsTodoListLoading(true);
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {"X-CSRF-TOKEN": token},
          credentials: "include"
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        if (!response.ok) {
          throw new Error('error');
        }

        const data = await response.json();

        setTodoList(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }
    fetchTodos();
  }, [token]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    setTodoList((previous) => [newTodo, ...previous]);

    try {
      const payload = {
        title: newTodo.title,
        isCompleted: newTodo.isCompleted
      };
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.id === newTodo.id) {
            return {
              ...todo,
              id: data.id,
              title: data.title,
              isCompleted: data.isCompleted
            };
          }
          return todo;
        })
      );
    } catch (error) {
      setError(error.message);
      setTodoList((previous) =>
        previous.filter((item) => item.id !== newTodo.id)
      );
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList(
      todoList.map((todo) => {
        return todo.id === id ? {...todo, isCompleted: true} : todo;
      })
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
        credentials: "include",
        body: JSON.stringify({isCompleted: true})
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.id === originalTodo.id) {
            return {
              ...todo,
              isCompleted: originalTodo.isCompleted
            };
          }
          return todo;
        })
      );

      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    const beforeUpdateTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return {
          ...editedTodo
        };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);

    try {
      const payload = {
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted
      };

      const response = await fetch(`/api/tsks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
        credentials: "include",
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.id === beforeUpdateTodo.id) {
            return {
              ...todo,
              id: beforeUpdateTodo.id,
              title: beforeUpdateTodo.title,
              isCompleted: beforeUpdateTodo.isCompleted
            };
          }
          return todo;
        })
      );
      setError(error.message);
    }

    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === beforeUpdateTodo.id) {
          return {
            ...todo,
            id: beforeUpdateTodo.id,
            title: beforeUpdateTodo.title,
            isCompleted: beforeUpdateTodo.isCompleted
          };
        }
        return todo;
      })
    );
  }

  return (
    <div>
      {error !== "" && (
        <>
          <p>{error}</p>
          <button onClick={() => setError("")}>Clear Error</button>
        </>
      )}

      {isTodoListLoading && <p>Loading</p>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList
        onUpdateTodo={updateTodo}
        todoList={todoList}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}
