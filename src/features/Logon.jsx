// import {useState} from "react";
// import {useAuth} from "../contexts/AuthContext.jsx";
// export default function Logon() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [authError, setAuthError] = useState("");
//   const [isLoggingOn, setIsLoggingOn] = useState(false);

//   const {login} = useAuth();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       setIsLoggingOn(true);

//       const result = await login(email, password);

//       if (result.success === false) {
//         setAuthError(result.error);
//       }
//     } catch (error) {
//       setAuthError(`Error: ${error.name} | ${error.message}`);
//     } finally {
//       setIsLoggingOn(false);
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       {authError && <p>{authError}</p>}
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         required
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         required
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit" disabled={isLoggingOn}>
//         {isLoggingOn ? "Logging In..." : "Log On"}
//       </button>
//     </form>
//   );
// }
