import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../App";

const Feedback = () => {
  const { BASE, loading, setLoading } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/feedbacks`, feedback);
      if (response.status === 201) {
        setStatus(`Thank you for your valuable feedback!`);
      
      }else{
        setStatus("Error!")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("Error: Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Feedback</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            rows={4}
            cols={50}
          />
          <button onClick={handleSubmit}>Submit Feedback</button>
          {status && <p>{status}</p>}
        </div>
      )}
    </div>
  );
};

export default Feedback;
