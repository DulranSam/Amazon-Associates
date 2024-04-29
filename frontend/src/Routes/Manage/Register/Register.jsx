import { useContext, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

const Register = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [userData, setUserData] = useState({
    username: "",
    password: "" // Added password field to the state
  });
  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    setStatus("");
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/register`, userData); // Sending userData in POST request
      if (response.status === 201) {
        setStatus("Registration complete! Redirecting to login...");
        setTimeout(() => {
          navigator("/login");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setStatus(`${userData.username} is already taken!`); // Using userData.username
      } else {
        setStatus("Error occurred during registration");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={userRegister}>
          <input
            type="text"
            value={userData.username}
            onChange={handleChange}
            name="username"
            placeholder="Enter username..."
            required
          />
          <input
            type="password" // Input type changed to password for password field
            value={userData.password}
            onChange={handleChange}
            name="password"
            placeholder="Enter password..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <h2>{status}</h2>
        <Link to="/login">Already a user? Log in</Link>
      </div>
    </div>
  );
};

export default Register;
