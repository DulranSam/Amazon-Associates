import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Unknown Page</h1>
      <Link to={"/"}>Go back home!</Link>
    </div>
  );
};

export default NotFound;
