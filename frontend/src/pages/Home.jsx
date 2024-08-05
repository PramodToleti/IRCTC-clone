import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import TrainCard from "../components/TrainCard";

const Home = () => {
  const token = Cookies.get("access_token");
  const username = localStorage.getItem("username");
  const [places, setPlaces] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchPlaces() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://irctc-clone-pvdx.onrender.com/api/trains/places"
      );
      const data = await response.json();
      setPlaces(data?.places);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://irctc-clone-pvdx.onrender.com/api/trains/availability?source=${source}&destination=${destination}`
      );
      const data = await response.json();
      console.log(data);
      setTrains(data?.trains);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black h-screen p-6 px-24 overflow-y-scroll">
      <Navbar />
      <div className="mt-10">
        <h1 className="text-gray-400 text-2xl mb-3">Hi {username}!</h1>
        <h1 className="text-white text-4xl">Go Somewhere?</h1>
        <div className="w-full flex justify-evenly items-center mt-14">
          <select
            className="bg-black text-white p-5 w-[35%] border border-white text-lg rounded-full mt-2"
            onClick={(e) => {
              setSource(e.target.value);
            }}
          >
            <option value="">Source</option>
            {places.map((place, i) => (
              <option key={i} value={place.place}>
                {place.place}
              </option>
            ))}
          </select>
          <FaArrowRightLong className="text-gray-400 text-2xl mt-4" />
          <select
            className="bg-black text-white p-5 border w-[35%] border-white text-lg rounded-full mt-2"
            onClick={(e) => {
              setDestination(e.target.value);
            }}
          >
            <option value="">Destination</option>
            {places.map(
              (place, i) =>
                place.place !== source && (
                  <option key={i} value={place.place}>
                    {place.place}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-500 p-4 text-white rounded-full text-xl"
            onClick={() => handleSearch()}
          >
            <IoSearch fontSize={22} />
          </button>
        </div>
        <div className="w-full mt-10">
          {loading ? (
            <div className="min-h-32 flex justify-center items-center text-white">
              Loading...
            </div>
          ) : (
            <>
              <div className="text-white text-2xl mb-2">
                {trains.length} Trains Found
              </div>

              <div className="grid grid-cols-4 gap-6">
                {trains.map((train, i) => (
                  <TrainCard
                    key={i}
                    train={train}
                    handleSearch={handleSearch}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
