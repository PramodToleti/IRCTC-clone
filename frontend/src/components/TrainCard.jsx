import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { FaTrainSubway } from "react-icons/fa6";

const TrainCard = ({ key, train, handleSearch }) => {
  const [loading, setLoading] = useState(false);
  const [noOfSeats, setNoOfSeats] = useState(1);
  const userId = localStorage.getItem("user_id");
  const [showModal, setShowModal] = useState(false);

  const bookSeat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/book/${train.train_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
          body: JSON.stringify({ user_id: userId, no_of_seats: noOfSeats }),
        }
      );

      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (response.ok) {
        setShowModal(false);
        toast.success("Seat Booked Successfully");
        handleSearch();
      } else {
        handleSearch();
        toast.error(data.error);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      handleSearch();
      toast.error("Failed to book seat");
    }
  };

  const handleBook = () => {
    setShowModal(true);
  };

  return (
    <div
      key={key}
      className="bg-red-500 p-4 rounded-xl flex justify-between mt-4 w-full min-h-52"
    >
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-white text-2xl">{train.train_name}</h1>
          <p className="text-white text-lg">
            Availabe Seats:{" "}
            <strong className="text-xl">{train.available_seats}</strong>
          </p>
        </div>
        <button
          className="bg-white text-red-500 p-2 rounded-md"
          onClick={() => handleBook()}
        >
          Book Now
        </button>
      </div>
      <div className="flex items-center">
        <FaTrainSubway className="text-white" fontSize={60} />
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl min-w-[450px]">
            <h1 className="text-2xl text-red-500 mb-4">{train.train_name}</h1>
            <p className="text-lg mb-2">
              Available Seats: {train.available_seats}
            </p>
            <input
              type="number"
              className="border border-red-500 p-2 rounded-md w-full"
              value={noOfSeats}
              onChange={(e) => setNoOfSeats(e.target.value)}
            />
            <div className="flex justify-between mt-4 gap-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md w-full mt-2"
                onClick={() => bookSeat()}
              >
                {loading ? "..." : "Book Now"}
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-md w-full mt-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrainCard;
