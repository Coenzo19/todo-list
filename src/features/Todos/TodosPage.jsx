import {useEffect, useCallback, useReducer} from "react";
import TodoList from "./TodoList/TodoList.jsx";
import TodoForm from "./TodoForm.jsx";
import SortBy from "../../shared/SortBy.jsx";
import useDebounce from "../../utils/useDebounce.js";
import FilterInput from "../../shared/FilterInput.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS
} from "../../reducers/todoReducer";

export default function TodosPage() {
  const {token} = useAuth();

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

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: {todos: data.tasks}
        });
      } catch (error) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "asc"
        ) {
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: {
              message: `Error filtering/sorting todos: ${error.message}`
            }
          });
        } else {
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
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: {filterTerm: newTerm}
    });
  };

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };

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

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          id: newTodo.id,
          addedTodo: data
        }
      });

     
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          id: newTodo.id,
          message: "Could not add Todo"
        }
      });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }

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

      const data = await response.json();
     
      if (!response.ok) {
        
        throw new Error(`Error: ${response.status} could not complete todo`);
      }
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: {id: data.id, fetchedTodo: data}
      });
      
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          originalTodo: originalTodo,
          message: error.message
        }
      });
    }
  }

  async function updateTodo(editedTodo) {
    const oldTodo = todoList.find((todo) => todo.id === editedTodo.id);

    if (!oldTodo) {
      return;
    }

    dispatch({type: TODO_ACTIONS.UPDATE_TODO_START, payload: editedTodo});
    try {
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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${response.status}, could not edit Todo`);
      }
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: {
          fetchedTodo: data,
          id: data.id
        }
      });
      
      
    } catch (error) {
      
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          oldTodo: oldTodo,
          message: error.message
        }
      });
    }
  }

  return (
    <div>
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(value) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: {sortBy: value, sortDirection: sortDirection}
          })
        }
        onSortDirectionChange={(value) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: {sortBy: sortBy, sortDirection: value}
          })
        }
      />
      {error && (
        <>
          <p>{error}</p>
          <button onClick={() => dispatch({type: TODO_ACTIONS.CLEAR_ERROR})}>
            Clear Error
          </button>
        </>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          <button
            onClick={() => dispatch({type: TODO_ACTIONS.CLEAR_FILTER_ERROR})}
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
