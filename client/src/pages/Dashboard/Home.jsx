import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AnimationPage from "./AnimationPage";

import Navbar from "./NavbarHome";

export default function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email === "admin@gmail.com" && data.password === "123456") {
      // alert("login successfully");
      navigate("/dashboard/student");
    } else {
      alert("Login failed please try again");
    }
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
            with admin email and password.
          </div>
        </div>
        {/* end alert */}

        <section className="w-2/5 mx-auto shadow-2xl rounded-lg bg-slate-100">
          <h1 className="text-2xl text-center text-slate-700 pt-4 font-semibold mt-10 mb-10">
            Admin Authentication
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
                <p className="text-red-500 text-sm">Valid email is required.</p>
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
                <p className="text-red-500 text-sm">
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
                    `bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-6 rounded mt-2`
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
}
