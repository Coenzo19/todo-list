import {useState} from "react";
import "./App.css";
import TodoList from "/src/features/TodoList/TodoList.jsx";
import TodoForm from "/src/features/TodoForm.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };
    setTodoList((previous) => [newTodo, ...previous]);
  }
  // return todo.id===id? {...todo, isCompleted: true}:todo
  function completeTodo(id) {
    setTodoList(
      todoList.map((todo) => {
        return todo.id === id ? {...todo, isCompleted: true} : todo;
      })
    );
  }

  function updateTodo(editedTodo) {
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
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        onUpdateTodo={updateTodo}
        todoList={todoList}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default App;
