import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const AddTrain = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = Cookies.get("access_token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://irctc-clone-pvdx.onrender.com/api/trains/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Train Added Successfully");
        navigate("/");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Train");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-black h-screen p-6 px-24 overflow-y-scroll">
      <Navbar />
      <div className="flex flex-col justify-start items-center h-full ">
        <div className="text-white text-2xl mt-8 mb-4">Add Train</div>
        <form
          className="flex flex-col w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Train Name"
            className="p-4 my-2 rounded-md"
            {...register("train_name", { required: true })}
          />
          {errors.trainName && (
            <span className="text-red-500">Train Name is required</span>
          )}
          <input
            type="text"
            placeholder="Source"
            className="p-4 my-2 rounded-md"
            {...register("source", { required: true })}
          />
          {errors.source && (
            <span className="text-red-500">Source is required</span>
          )}

          <input
            type="text"
            placeholder="Destination"
            className="p-4 my-2 rounded-md"
            {...register("destination", { required: true })}
          />
          {errors.destination && (
            <span className="text-red-500">Destination is required</span>
          )}
          <input
            type="number"
            placeholder="Seat Capacity"
            className="p-4 my-2 rounded-md"
            {...register("seat_capacity", { required: true })}
          />
          {errors.seat_capacity && (
            <span className="text-red-500">Seat Capacity is required</span>
          )}
          <input
            type="text"
            placeholder="Arrival Time"
            className="p-4 my-2 rounded-md"
            {...register("arrival_time_at_source", { required: true })}
          />
          {errors.arrival_time_at_source && (
            <span className="text-red-500">Arrival Time is required</span>
          )}
          <input
            type="text"
            placeholder="Departure Time"
            className="p-4 my-2 rounded-md"
            {...register("arrival_time_at_destination", { required: true })}
          />
          {errors.arrival_time_at_destination && (
            <span className="text-red-500">Departure Time is required</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-4 my-2 rounded-md text-lg"
          >
            {loading ? "..." : "Add Train"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrain;
