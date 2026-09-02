import {useAuth} from "../contexts/AuthContext.jsx";

export default function Logoff() {
    
  const {logout} = useAuth();
  return <button onClick={logout}>Log Off</button>;
}
