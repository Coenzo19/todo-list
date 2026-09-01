import {useEffect, useCallback, useReducer} from "react";
import TodoList from "./TodoList/TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import SortBy from "../../shared/SortBy.jsx";
import useDebounce from "../../utils/useDebounce.js";
import FilterInput from "../../shared/FilterInput.jsx";
import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS
} from "../../reducers/todoReducer";

export default function TodosPage({token}) {
  //const [todoList, setTodoList] = useState([]);
  // const [error, setError] = useState("");
  // const [isTodoListLoading, setIsTodoListLoading] = useState(false);
  // const [sortBy, setSortBy] = useState("createdAt");
  // const [sortDirection, setSortDirection] = useState("desc");
  // const [filterTerm, setFilterTerm] = useState("");
  // const [dataVersion, setDataVersion] = useState(0);
  // const [filterError, setFilterError] = useState("");

  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {
    async function fetchTodos() {
      const paramObject = {
        sortBy,
        sortDirection,
        limit: 100
      };
      if (debouncedFilterTerm) {
        paramObject.find = debouncedFilterTerm;
      }
      const params = new URLSearchParams(paramObject);

      try {
        //setIsTodoListLoading(true);
        dispatch({type: TODO_ACTIONS.FETCH_START});
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {"X-CSRF-TOKEN": token},
          credentials: "include"
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        if (!response.ok) {
          throw new Error("error retrieving data");
        }

        const data = await response.json();

        //setTodoList(data.tasks);
        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {todos: data.tasks}
        });
        // setFilterError("");
        // setError("");
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          //setFilterError(`Error filtering/sorting todos: ${error.message}`);
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: {
              message: `Error filtering/sorting todos: ${error.message}`
            }
          });
        } else {
          //setError(`Error fetching todos: ${error.message}`);
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: {message: `Error fetching todos: ${error.message}`}
          });
        }
      }
    }
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const handleFilterChange = (newTerm) => {
    // setFilterTerm(newTerm);
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: {filterTerm: newTerm}
    });
  };

  const invalidateCache = useCallback(() => {
    //setDataVersion((prev) => prev + 1);

    dispatch({
      type: TODO_ACTIONS.SET_DATAVERSION,
      payload: {dataVersion: dataVersion + 1}
    });
  }, [dataVersion]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    //setTodoList((previous) => [newTodo, ...previous]);

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: newTodo
    });
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
        throw new Error(response.statusText);
      }

      const data = await response.json();

      // setTodoList((prev) =>
      //   prev.map((todo) => {
      //     if (todo.id === newTodo.id) {
      //       return data;
      //     }
      //     return todo;
      //   })
      // );
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          id: newTodo.id,
          addedTodo: data
        }
      });

      invalidateCache();
    } catch (error) {
      //setTodoList((prev) => prev.filter((item) => item.id !== newTodo.id));
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          id: newTodo.id,
          message: "Could not add Todo"
        }
      });
      //setError(error.message);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }

    // setTodoList((prev) =>
    //   prev.map((todo) => {
    //     return todo.id === id ? {...todo, isCompleted: true} : todo;
    //   })
    // );
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: id
    });
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
        credentials: "include",
        body: JSON.stringify({isCompleted: true})
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} could not complete todo`);
      }
      invalidateCache();
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo: originalTodo,
          message: error.message
        }
      });

      // setTodoList((prev) =>
      //   prev.map((todo) => {
      //     if (todo.id === originalTodo.id) {
      //       return originalTodo;
      //     }
      //     return todo;
      //   })
      // );

      // setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    const oldTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!oldTodo) {
      return;
    }
    // setTodoList((prev) => {
    //   return prev.map((todo) => {
    //     if (todo.id === editedTodo.id) {
    //       return editedTodo;
    //     }
    //     return todo;
    //   });
    // });

    dispatch({type: TODO_ACTIONS.UPDATE_TODO_START, payload: editedTodo});
    try {
      //setError("");
      const payload = {
        title: editedTodo.title,
        isCompleted: editedTodo.isCompleted
      };
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "X-CSRF-TOKEN": token},
        credentials: "include",
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, could not edit Todo`);
      }
      invalidateCache();
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          oldTodo: oldTodo,
          message: error.message
        }
      });
      // setTodoList((prev) =>
      //   prev.map((todo) => {
      //     if (todo.id === oldTodo.id) {
      //       return oldTodo;
      //     }
      //     return todo;
      //   })
      // );
      //setError(error.message);
    }
  }

  return (
    <div>
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(value) =>
          dispatch({type: TODO_ACTIONS.SET_SORT, payload: value})
        }
        onSortDirectionChange={(value) =>
          dispatch({type: TODO_ACTIONS.SET_DIRECTION, payload: value})
        }
      />
      {error && (
        <>
          <p>{error}</p>
          <button
            onClick={() =>
              dispatch({type: TODO_ACTIONS.SET_ERROR, payload: ""})
            }
          >
            Clear Error
          </button>
        </>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            onClick={() =>
              dispatch({type: TODO_ACTIONS.SET_ERROR, payload: ""})
            }
          >
            Clear Filter Error
          </button>
          <button
            onClick={() => {
              dispatch({type: TODO_ACTIONS.RESET_FILTERS});
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      {isTodoListLoading && <h2>Loading</h2>}

      <TodoForm onAddTodo={addTodo} />
      <TodoList
        onUpdateTodo={updateTodo}
        todoList={state.todoList}
        onCompleteTodo={completeTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}
