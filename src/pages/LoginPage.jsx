import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router";
import {useAuth} from "../contexts/AuthContext";
import classes from "../classes.module.css";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    setAuthError("");
    setEmailError("");
    setPasswordError("");

    if (email.length > 30) {
      setEmailError("Email is too long");
    }
    if (password.length > 30) {
      setPasswordError("Password is too long");
    }
    if (passwordError || emailError) {
      return;
    }
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
    //sanitize and validate input

    <form onSubmit={handleSubmit} className={classes["login-container"]}>
      {authError && (
        <p
          className={classes["auth-error"]}
        >{`${authError}. Please check that your username or email is correct`}</p>
      )}
      <label className={classes["login-labels"]} htmlFor="email">
        Email
      </label>
      <input
        className={classes["input-field"]}
        type="email"
        required
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <span className={classes["validation-error"]}>
        {emailError && emailError}
      </span>

      <label className={classes["login-labels"]} htmlFor="password">
        Password
      </label>
      <input
        className={classes["input-field"]}
        type="password"
        required
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span className={classes["validation-error"]}>
        {passwordError && passwordError}
      </span>
      <button
        className={classes["logOn-button"]}
        type="submit"
        disabled={isLoggingOn}
      >
        {isLoggingOn ? "Logging In..." : "Log On"}
      </button>
    </form>
  );
}
