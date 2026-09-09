import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router";
import {useAuth} from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, {replace: true});
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoggingOn(true);

      const result = await login(email, password);

      if (result.success === false) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        required
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        required
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging In..." : "Log On"}
      </button>
    </form>
  );
}
