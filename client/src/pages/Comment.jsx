import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Comment = () => {
  const { id } = useParams();
  const { tid } = useParams();

  // console.log("params : ", id);

  const [allComment, setAllComment] = useState([]);
  const [added, setAdd] = useState("");

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/comment");
      const data = await res.data;
      console.log(data);
      setAllComment(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, [added]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://localhost:5000/comment", {
        comments: data.comment,
        studentId: id,
        teacherId: tid,
        rating: data.rating,
      })
      .then(
        (response) => {
          setAdd(response.data);
          console.log(response.data);
          toast.success("Comment inserted successfully!");
          reset();
          // alert("Comment Inserted!");

          // redirect("/comment");
          // navigate("/comment");
        },
        (error) => {
          console.log(error.message);
        }
      );
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl text-center text-slate-800 font-semibold mt-10 mb-10">
        Students Feedback
      </h1>
      {/* start alert */}
      <div
        className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-3/4 m-auto"
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
          <span className="font-medium">Important!</span> Please submit your
          feedback regarding your teacher and remember your message can not be
          change.
        </div>
      </div>
      {/* end alert */}

      <form className=" mt-5 w-3/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-3">
          <label>Comments</label>
          <input
            type="text"
            {...register("comment", { required: true })}
            // name="city"
            // id="city"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            // value=""
            placeholder="Student Comments"
          />
          {errors.comment && (
            <p className="text-red-500">Student comments is required.</p>
          )}
        </div>
        <div className="mt-3">
          <label>Ranking</label>
          <select
            {...register("rating")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="01-Excellent">01-Excellent</option>
            <option value="02-Best">02-Best</option>
            <option value="03-Normal">03-Normal</option>
            <option value="04-Unsatisfy">04-Unsatisfy</option>
          </select>
          {errors.rating && <p className="text-red-500">Select a ranking.</p>}
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
              Insert Feedback
            </button>
          </div>
        </div>
      </form>

      {/* table section start */}

      <section>
        <div className="border rounded-lg mx-5 mt-10 overflow-hidden shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-900 rounded-lg text-white">
                <th scope="col" className="pl-5 w-10 py-3">
                  S #
                </th>

                <th scope="col" className="pl-5 py-3">
                  COMMENT
                </th>
                <th scope="col" className="py-3 w-28 ">
                  CREATED AT
                </th>
                <th scope="col" className="pr-2 w-28 py-3">
                  RANK
                </th>
              </tr>
            </thead>
            <tbody>
              {allComment &&
                allComment.map((coment, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                    >
                      <td className="pl-5 py-3">{ind + 1}</td>

                      <td className="pl-5 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {coment.comments}
                      </td>

                      <td className="py-3">
                        {dayjs(coment.createdAt).format("DD-MMM-YYYY")}
                      </td>
                      <td className="mr-6 py-3">{coment.rating}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
export default Comment;
