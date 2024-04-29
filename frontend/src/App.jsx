/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Home/Auth/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Home/Auth/Register";
import Create from "./Components/Add/Create";
import NotFound from "./Components/NotFound/NotFound";
import Feedback from "./Components/Feedback/Feedback";
import Item from "./Components/Item/Item";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [theUser, setTheUser] = useState(() => {
    const storedCompany = localStorage.getItem("users");
    return storedCompany
      ? JSON.parse(storedCompany)
      : { username: "", password: "" };
  });
  const [status, setStatus] = useState("");
  const BASE = "http://localhost:8000";
  // const location = useLocation();

  useEffect(() => {
    setStatus("");
  }, [location]);

  const theStates = {
    loading,
    setLoading,
    theUser,
    setTheUser,
    status,
    setStatus,
    BASE,
  };

  return (
    <UserContext.Provider value={theStates}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<Item/>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Feedback />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
