import TodoListItem from "./TodoListItem.jsx";
import {useMemo} from "react"
function TodoList({onUpdateTodo, todoList, onCompleteTodo, dataVersion}) {
  

  const filteredTodoList = useMemo(() => {
    
    return {
      version: dataVersion,
      
      todos: todoList.filter((todo) => !todo.isCompleted)
    };
  }, [todoList, dataVersion]);
  return (
    <>
      {filteredTodoList.todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((todo) => (
            <TodoListItem
              onUpdateTodo={onUpdateTodo}
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
