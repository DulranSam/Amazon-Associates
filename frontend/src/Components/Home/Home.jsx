/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Home = () => {
  const { loading, setLoading, status, setStatus, BASE } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  async function fetchMain() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains?type=${selectedType}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMain();
  }, [selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div>
      <h1>Home</h1>
      <p>{loading && "Loading..."}</p>
      <div>
        <label htmlFor="type">Filter by Type:</label>
        <select id="type" value={selectedType} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="shirt">Shirt</option>
          <option value="pants">Pants</option>
          <option value="dress">Dress</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="data">
        {data && data.length ? JSON.stringify(data) : <h1>No results found</h1>}
      </div>
      <h2>{status}</h2>
    </div>
  );
};

export default Home;
