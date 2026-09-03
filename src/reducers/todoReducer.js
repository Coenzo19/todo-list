export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  //Add todo operations
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  //Addition todo operations
  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  //Ui operations
  SET_SORT: "SET_SORT",
  SET_DIRECTION: "SET_DIRECTION",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
  RESET_FILTERS: "RESET_FILTERS",
  SET_ERROR: "SET_ERROR",
  SET_FILTER_ERROR: "SET_FILTER_ERROR",
  SET_DATAVERSION: "SET_DATAVERSION"
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdAt",
  sortDirection: "asc",
  filterTerm: "",
  dataVersion: 0
};

export function todoReducer(state, action) {
  console.log("Dispatched action:", action.type, action.payload);
  switch (action.type) {
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: ""
      };
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
        isTodoListLoading: false
      };
    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        error: action.payload.message,
        isTodoListLoading: false
      };

    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        todoList: [action.payload, ...state.todoList]
      };

    ////////////////////////////////////////////////////////////
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload.addedTodo;
          }
          return todo;
        })
      };
    ////////////////////////////////////////////////////////////

    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.filter(
          (item) => item.id !== action.payload.id
        ),
        error: action.payload.message
      };
    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          return todo.id === action.payload
            ? {...todo, isCompleted: true}
            : todo;
        })
      };

    // case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
    //   return {};
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.originalTodo.id) {
            return action.payload.originalTodo;
          }
          return todo;
        }),
        error: action.payload.message
      };
    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
        error: ""
      };
    // case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
    //   return {};
    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === action.payload.oldTodo.id) {
            return action.payload.oldTodo;
          }
          return todo;
        }),
        error: action.payload.message
      };
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sort
      };
    case TODO_ACTIONS.SET_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload.direction
      };
    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload.filterTerm
      };
    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: "",
        sortBy: "createdAt",
        sortDirection: "desc",
        filterError: ""
      };
    case TODO_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    case TODO_ACTIONS.SET_FILTER_ERROR:
      return {
        ...state,
        filterError: action.payload.message
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        filterError: "",
        error: ""
      };

    case TODO_ACTIONS.SET_DATAVERSION:
      return {
        ...state,
        dataVersion: action.payload.dataVersion
        //filterTerm: action.payload.filterTerm
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
