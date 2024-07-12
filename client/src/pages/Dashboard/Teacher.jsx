import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";

export default function Teacher() {
  const [allTeacher, setAllTeacher] = useState([]);
  const [add, setAdd] = useState("");

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/teacher");
      const data = await res.data;
      console.log(data);
      setAllTeacher(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, [add]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://localhost:5000/teacher", {
        teacher: data.teacher,
        batchno: data.batchno,
      })
      .then(
        (response) => {
          console.log(response);
          setAdd(response);
          // alert("Signup Successfully!");
          reset();
          toast.success("Successfully inserted!");
        },
        (error) => {
          console.log(error.message);
        }
      );
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="text-2xl text-center font-semibold mt-5">
        Teacher Record
      </h3>

      {/* start alert */}
      <div
        className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-3/5 m-auto"
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
          <span className="font-medium">Important Message!</span> Please submit
          teacher name with batch number.
        </div>
      </div>
      {/* end alert */}

      <form
        className="lg:col-span-2 mt-3 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        // onClick={()=> onSubmit}
      >
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 w-3/5 mx-auto md:grid-cols-6">
          <div className="md:col-span-3">
            <label>Teacher Name</label>
            <input
              type="text"
              {...register("teacher", { required: true })}
              // name="address"
              // id="address"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              // value=""
              placeholder="Enter Student name"
            />
            {errors.teacher && (
              <p className="text-red-500">Teacher name is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>Batch Number</label>
            <input
              type="number"
              {...register("batchno", { required: true, minLength: 2 })}
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
              placeholder="Enter Batch No"
            />
            {errors.batchno && (
              <p className="text-red-500">Enter the Batch Number.</p>
            )}
          </div>

          <div className="">
            <div className="">
              <button
                // disabled={!pImage}
                className={
                  // !pImage
                  //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                  `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-2`
                }
              >
                INSERT
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* end form */}

      <section>
        <div className="border rounded-lg mt-10 w-3/5 mx-auto overflow-hidden shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-900 rounded-lg text-white">
                <th scope="col" className="pl-5 w-16 py-3">
                  S #
                </th>

                <th scope="col" className="pl-5 py-3">
                  TEACHER NAME
                </th>
                <th scope="col" className="pl-5 py-3">
                  BATCH NO.
                </th>
                <th scope="col" className="py-3">
                  CREATED AT
                </th>
              </tr>
            </thead>
            <tbody>
              {allTeacher &&
                allTeacher.map((teacher, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                    >
                      <td className="pl-5 py-3">{ind + 1}</td>

                      <td className="pl-5 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {teacher.teacher}
                      </td>

                      <td className="pl-5 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {teacher.batchno}
                      </td>

                      <td className="py-3">
                        {dayjs(teacher.createdAt).format("DD-MMM-YYYY")}
                      </td>
                      {/* <td className="mr-6 py-3">{coment.rating}</td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
