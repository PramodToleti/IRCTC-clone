import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const token = Cookies.get("access_token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div className="">Home</div>;
};

export default Home;
