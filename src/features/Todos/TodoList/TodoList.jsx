import TodoListItem from "./TodoListItem.jsx";
import {useMemo} from "react"
function TodoList({onUpdateTodo, todoList, onCompleteTodo, dataVersion}) {
  // const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  const filteredTodoList = useMemo(() => {
    console.log(`Recalculating filtered todos (v${dataVersion})`);
    return {
      version: dataVersion,
      todos: todoList.filter((todo) => !todo.isCompleted)
    };
  }, [todoList, dataVersion]);
  console.log(filteredTodoList);
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
