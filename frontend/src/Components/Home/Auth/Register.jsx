/* eslint-disable no-unused-vars */
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, BASE, setStatus } = useContext(UserContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const navigator = useNavigate();

  async function RegisterFetch(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/register`, user); // Assuming your backend route is /register
      if (response.status === 201) {
        setStatus(`${user.username} Registered! Please login!`);
        setTimeout(() => {
          navigator("/login"); // Redirect to login page after registration
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={RegisterFetch}>
        <input
          onChange={handleChange}
          name="username"
          placeholder="Enter username..."
          required
        />
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter password..."
          required
          type="password"
        />
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
      <Link to={"/login"}>Already have an account?</Link>
      <p>{status}</p>
    </div>
  );
};

export default Register;
