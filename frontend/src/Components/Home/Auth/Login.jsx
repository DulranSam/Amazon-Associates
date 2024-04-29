import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { Link,  } from "react-router-dom";

const Login = () => {
  const { loading, setLoading, BASE, setStatus, setTheUser } = useContext(UserContext);
  // const history = useHistory();

  const [user, setUser] = useState({ username: "", password: "" });

  const LoginFetch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/login`, user); // Assuming your backend route is /login
      if (response.status === 200) {
        setTheUser(response.data.user);
        setStatus(`Welcome back ${user.username}!`);
        setTimeout(() => {
          setStatus("");
          history.push("/"); // Redirect to home page
        }, 1500);
      } else if (response.status === 401) {
        setStatus("Wrong password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // No need to call LoginFetch in useEffect, it's called onSubmit of the form
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={LoginFetch}>
        <input onChange={handleChange} name="username" placeholder="Enter username..." required />
        <input onChange={handleChange} name="password" placeholder="Enter password..." type="password" required />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <h1>{status}</h1>
      <Link to={"/register"}>First time here?</Link>
    </div>
  );
};

export default Login;
