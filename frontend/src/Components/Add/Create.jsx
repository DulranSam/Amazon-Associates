/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";

const Create = () => {
  const { loading, setLoading, BASE, setStatus, theUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    links: "",
  });

  const createListing = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await Axios.post(`${BASE}/mains`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        setStatus("Listing created successfully.");
        setFormData({
          title: "",
          description: "",
          category: "",
          links: "",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Create Listing</h1>
      <form onSubmit={createListing}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title..."
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category..."
          />
        </div>
        <div>
          <label>Links:</label>
          <input
            type="text"
            name="links"
            value={formData.links}
            onChange={handleChange}
            placeholder="Enter links..."
          />
        </div>
        <button type="submit" disabled={loading}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
