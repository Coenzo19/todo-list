import {useAuth} from "../contexts/AuthContext.jsx";
import {useState} from "react";

export default function Logoff() {
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const {logout} = useAuth();
  async function handleSubmit() {
    try {
      setIsLoggingOff(true);
      const result = await logout();
      console.log(result);

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOff(false);
    }
  }

  return (
    <button onClick={handleSubmit} disabled={isLoggingOff}>
      {isLoggingOff ? "Logging out" : "Log Off"}
    </button>
  );
}
