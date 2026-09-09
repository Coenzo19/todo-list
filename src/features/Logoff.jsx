import {useAuth} from "../contexts/AuthContext.jsx";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Logoff() {
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const {logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogoff() {
    setIsLoggingOff(true);

    const result = await logout();

    if (result.success) {
      navigate("/login");
    } else {
      setIsLoggingOff(false);
    }
  }

  return (
    <button onClick={handleLogoff} disabled={isLoggingOff}>
      {isLoggingOff ? "Logging out" : "Log Off"}
    </button>
  );
}
