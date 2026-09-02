
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage.jsx";
import Logon from "./features/Logon";
import "./App.css";
import { useAuth } from "./contexts/AuthContext.jsx";

function App() {

  const {isAuthenticated}=useAuth();

  return (
    <>
      <Header/>
      {isAuthenticated ? (
        <TodosPage/>
      ) : (
        <Logon/>
      )}
    </>
  );
}

export default App;
