import {useState} from "react";
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage.jsx";
import Logon from "./features/Logon";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  return (
    <>
      <Header />
      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}
    </>
  );
}

export default App;
