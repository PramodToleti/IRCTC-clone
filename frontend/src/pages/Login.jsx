import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("access_token");
  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://irctc-clone-pvdx.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      setLoading(false);
      if (response.ok) {
        Cookies.set("access_token", result.access_token);
        localStorage.setItem("user_id", result.user_id);
        localStorage.setItem("isAdmin", result.isAdmin);
        localStorage.setItem("username", result.username);
        toast.success("Login successful");
        setTimeout(() => {
          return <Navigate replace to="/" />;
        }, 2000);
      } else {
        toast.error(result.status);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 h-screen bg-black">
      <div className="bg-white p-8 w-full md:w-[30%] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">IRCTC</h1>
        <p className="text-center text-lg text-gray-500">
          Book your trains tickets
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="mt-1 block border border-gray-400 p-3 w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">Username is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md  p-3 border border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            {loading ? "..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          Dont have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
