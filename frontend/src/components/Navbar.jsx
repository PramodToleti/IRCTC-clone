import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    navigate("/login");
  };

  return (
    <nav className=" text-white p-2">
      <div className="container flex justify-between w-full">
        <Link className="text-2xl" to="/">
          IRCTC
        </Link>
        <div className="">
          <Link className="text-xl mx-4" to="/">
            Trains
          </Link>
          {isAdmin === "true" ? (
            <Link className="text-xl mx-4" to="/admin/add-train">
              Add Train
            </Link>
          ) : (
            <Link className="text-xl mx-4" to="/my-bookings">
              My Bookings
            </Link>
          )}
          <button className="text-xl mx-4" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
