import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({children}) {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  
  const login = async (userEmail, password) => {
    try {
      setIsAuthLoading(true);
      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: userEmail, password}),
        credentials: "include"
      };

      const res = await fetch("/api/users/logon", options);
      const data = await res.json();

      if (res.status === 200 && data.name && data.csrfToken) {
        // Success: Update state

        setName(data.name);
        setEmail(data.email);
        setToken(data.csrfToken);
        localStorage.setItem("token", data.csrfToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

        return {success: true};
      } else {
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error during login"
      };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    if (!token) {
      setName("");
      setEmail("");
      setToken("");
      localStorage.clear();
      return {success: true};
    }

    try {
      const options = {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-CSRF-Token": token},
        credentials: "include"
      };

      const res = await fetch("/api/users/logoff", options);

      if (res.status === 200) {
        return {success: true};
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error during logout"
      };
    } finally {
      setEmail("");
      setToken("");
      setName("");
      localStorage.clear();
    }
  };

  const value = {
    isAuthLoading,
    name,
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
