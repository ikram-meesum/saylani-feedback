import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AnimationPage from "./Dashboard/AnimationPage";

const Comment = () => {
  const { id } = useParams();
  const { tid } = useParams();

  // console.log("params : ", id);

  const [student, setStudent] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [added, setAdd] = useState("");
  // const [nextComment, setNextComment] = useState("");

  async function getData() {
    try {
      const res = await axios(`http://localhost:5000/student-comment/${id}`);
      const data = await res.data;
      console.log(data);
      setAllComment(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  async function getStudent() {
    try {
      const res = await axios(`http://localhost:5000/student/${id}`);
      const data = await res.data;
      console.log(data);
      setStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
    getStudent();
  }, [added]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("single: ", allComment[0].nextComment);

  const nextDate = allComment[0].nextComment;

  const onSubmit = (data) => {
    console.log(data);

    const currentDate = new Date();
    console.log(currentDate);

    var someDate = new Date();
    var numberOfDaysToAdd = 90;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    // console.log("add date: ", new Date(result));
    console.log("add date: ", result);
    // setNextComment(result);

    if (new Date(currentDate) < new Date(nextDate)) {
      alert("you are not allow due to next comment date");
    } else {
      axios
        .post("http://localhost:5000/comment", {
          comments: data.comment,
          studentId: id,
          teacherId: tid,
          rating: data.rating,
          nextComment: result,
        })
        .then(
          (response) => {
            setAdd(response.data);
            console.log(response.data);
            toast.success("Comment inserted successfully!");
            reset();
          },
          (error) => {
            console.log(error.message);
          }
        );
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <AnimationPage>
        <h3 className="text-center mt-8 text-3xl text-slate-800 mb-8 font-medium">
          Student Feedback
        </h3>

        <div className="w-3/4 mx-auto">
          {student.map((std, ind) => {
            return (
              <div
                key={ind}
                className="flex justify-between border border-gray-200 rounded-md p-2"
              >
                <div className="">Student Name:</div>
                <div className="font-medium">{std.sname}</div>
                <div className="">Father Name:</div>
                <div className="font-medium">{std.fname}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 w-3/4 mx-auto">
          {student.map((std, ind) => {
            return (
              <div
                key={ind}
                className="flex justify-between border border-gray-200 rounded-md p-2"
              >
                <div className="">Batch Number:</div>
                <div className="font-medium">{std.batch}</div>
                <div className="">Course:</div>
                <div className="font-medium">Web Development</div>
              </div>
            );
          })}
        </div>

        <form className=" mt-5 w-3/4 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <div className="w-1/2 mr-5">
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
            {/*  */}
            <div className="w-64 mr-5">
              <select
                {...register("rating")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="01-Excellent">01-Excellent</option>
                <option value="02-Best">02-Best</option>
                <option value="03-Normal">03-Normal</option>
                <option value="04-Unsatisfy">04-Unsatisfy</option>
              </select>
              {errors.rating && (
                <p className="text-red-500">Select a ranking.</p>
              )}
            </div>
            <div className="">
              <button
                // disabled={!pImage}
                className={
                  // !pImage
                  //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                  `bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded`
                }
              >
                Insert Feedback
              </button>
            </div>
          </div>
          {/*  */}
        </form>

        {/* table section start */}

        <section className="mb-20">
          <div className="border rounded-lg w-3/4 mx-auto mt-10 overflow-hidden shadow-lg">
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

                  <th scope="col" className="pr-2 w-28 py-3">
                    NEXT DATE
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

                        <td className="pl-5 font-normal text-gray-900">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {coment.comments}
                        </td>

                        <td className="py-3">
                          {dayjs(coment.createdAt).format("DD-MMM-YYYY")}
                        </td>
                        <td className="mr-6 py-3">{coment.rating}</td>
                        <td className="mr-6 py-3">
                          {dayjs(coment.nextComment).format("DD-MMM-YYYY")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </AnimationPage>
    </div>
  );
};
export default Comment;
