/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";

const Item = () => {
  const { id } = useParams();
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [data, setData] = useState([]);

  async function fetchItem() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/${id}`);
      if (response.status === 200) {
        setData(response.data);
      }else if(response.status===404){
        setStatus("No results found")
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h1>Item</h1>
          <p>{id}</p>
          <h2>{status}</h2>
          <div className="data">
            {data && data.length ? (
              JSON.stringify(data)
            ) : (
              <h1>No results found</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
