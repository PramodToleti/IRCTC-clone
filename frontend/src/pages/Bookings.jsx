import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchAllBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/user/${localStorage.getItem(
          "user_id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpecificBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setBooking(data.booking);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="bg-black h-screen p-6 px-24 overflow-y-scroll">
      <Navbar />
      <div className="text-white text-2xl mt-8 mb-4">My Bookings</div>
      <div className="text-white mt-4 cursor-pointer">
        {bookings.map((booking) => (
          <div
            key={booking.booking_id}
            className="border  p-2 px-4 my-2 mb-6"
            onClick={() => {
              fetchSpecificBooking(booking.booking_id);
            }}
          >
            <div>Booking ID: {booking.booking_id}</div>
            <div>Train ID: {booking.train_id}</div>
            <div>No of Seats: {booking.no_of_seats}</div>
            <div>Seat Numbers: {booking.seat_numbers.join(", ")}</div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-[350px] text-lg">
            <div>Booking ID: {booking.booking_id}</div>
            <div>Train ID: {booking.train_id}</div>
            <div>No of Seats: {booking.no_of_seats}</div>
            <div>Seat Numbers: {booking.seat_numbers.join(", ")}</div>
            <div>User ID: {booking.user_id}</div>
            <div>Arrival Time at Source: {booking.arrival_time_at_source}</div>
            <div>
              Arrival Time at Destination: {booking.arrival_time_at_destination}
            </div>
            <button
              className="bg-red-500 text-white p-2 px-4 rounded-lg mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
