import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AnimationPage from "./Dashboard/AnimationPage";

const login = () => {
  const navigate = useNavigate();
  // const [sid, setSid] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://localhost:5000/login", {
        email: data.email,
        password: data.password,
      })
      .then(
        (response) => {
          console.log("Login Data: ", response.data);
          sessionStorage.setItem("sid", response.data._id);
          // setSid(data._id);
          alert("Login Successfully!");
          // redirect("/comment");
          const storedValue = sessionStorage.getItem("sid");
          console.log("session id: ", storedValue);
          navigate(`/comment/${response.data._id}/${response.data.teacher_id}`);
        },
        (error) => {
          console.log(error.message);
        }
      );

    // const loginStudent = () => {
    //     axios
    //       .get("http://" + ip.address + ":3001/depart")
    //       .then((response) => {
    //         //console.log("depart:", response.data);
    //         setDepart(response.data);
    //       })
    //       .catch((error) => {
    //         console.log("Error from get depart function: ", error);
    //       });
    //   };
  };
  return (
    <>
      <Navbar />
      {/* start alert */}
      <AnimationPage>
        <div
          className="flex items-center p-4 mt-12 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-2/5 m-auto"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Important Message!</span> Please login
            with valid email and password.
          </div>
        </div>
        {/* end alert */}

        <section className="w-2/5 mx-auto shadow-2xl rounded-lg bg-slate-100">
          <h1 className="text-2xl text-center text-slate-700 pt-8 font-semibold mt-10 mb-10">
            Student Authentication
          </h1>
          <form className=" mt-5 px-6 pb-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:col-span-3">
              <label>Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                // name="city"
                // id="city"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                // value=""
                placeholder="Valid email"
              />
              {errors.email && (
                <p className="text-red-500">Valid email is required.</p>
              )}
            </div>
            <div className="mt-3">
              <label>Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500">
                  Password is atleast 6 characters.
                </p>
              )}
            </div>

            <div className="mt-3">
              <div className="">
                <button
                  // disabled={!pImage}
                  className={
                    // !pImage
                    //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                    `bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mt-2`
                  }
                >
                  Login
                </button>{" "}
              </div>
            </div>
          </form>
        </section>
      </AnimationPage>
    </>
  );
};

export default login;
