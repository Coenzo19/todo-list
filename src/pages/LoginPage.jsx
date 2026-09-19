import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router";
import {useAuth} from "../contexts/AuthContext";
import classes from "../classes.module.css";
import {sanitizeText} from "../utils/sanitizeText";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const {login, isAuthenticated} = useAuth();
  const cleanedEmail = sanitizeText(email);
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
    setAuthError("");

    if (typeof cleanedEmail != "string") {
      setAuthError("Email must be text");
      return;
    }
    if (cleanedEmail.length > 30) {
      setAuthError("Email must be 30 characters or fewer");
      return;
    }
    if (cleanedEmail.length < 1) {
      setAuthError("Email is required");
      return;
    }
    if (typeof password != "string") {
      setAuthError("Password must be text");
      return;
    }
    if (password.length > 30) {
      setAuthError("Password must be 30 characters or fewer");
      return;
    }
    if (password.length < 1) {
      setAuthError("Password is required");
      return;
    }
    try {
      setIsLoggingOn(true);

      const result = await login(cleanedEmail, password);

      if (result.success === false) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: Unable to log in. Please try again.`);
    } finally {
      setIsLoggingOn(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className={classes["login-container"]}>
      {authError && (
        <p
          className={classes["error"]}
        >{`Please check that your username or email is correct`}</p>
      )}
      <label className={classes["labels"]} htmlFor="email">
        Email
      </label>
      <input
        className={classes["input-field"]}
        type="email"
        required
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={30}
      />
      <span className={classes["error"]}>
        {email.length >= 30 && <p>Email must be 30 characters or fewer</p>}
      </span>

      <label className={classes["labels"]} htmlFor="password">
        Password
      </label>
      <input
        className={classes["input-field"]}
        type="password"
        required
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={30}
      />
      <span className={classes["error"]}>
        {password.length >= 30 && (
          <p>Password must be 30 characters or fewer</p>
        )}
      </span>
      <button
        className={classes["btn"]}
        type="submit"
        disabled={isLoggingOn || email.length > 30 || password.length > 30}
      >
        {isLoggingOn ? "Logging In..." : "Log On"}
      </button>
    </form>
  );
}
