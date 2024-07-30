import React, { useState } from "react";
import Navbar from "./Navbar";
import AnimationPage from "./AnimationPage";
import { useForm } from "react-hook-form";

export default function BatchWise() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <AnimationPage>
        <div className="text-3xl font-medium mt-9 text-center">BatchWise</div>

        <form
          className=" mt-5 px-6 pb-6 w-1/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:col-span-3">
            <label>Enter Batch Number</label>
            <input
              type="number"
              {...register("batch", { required: true })}
              // name="city"
              // id="city"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              // value=""
              placeholder="Valid email"
            />
            {errors.email && (
              <p className="text-red-500">Enter a valid batch number.</p>
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
              <p className="text-red-500">Password is atleast 6 characters.</p>
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
      </AnimationPage>
    </>
  );
}
