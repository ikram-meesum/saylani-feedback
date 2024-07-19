import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
import Navbar from "../Dashboard/Navbar";
import NoImage from "./noimages.png";
import axios from "axios";
import AnimationPage from "./AnimationPage";

export default function Ranking() {
  const [teacher, setTeacher] = useState([]);

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/rank");
      const data = await res.data;
      console.log(data);
      setTeacher(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <AnimationPage>
        <h2 className="text-2xl text-center">Teacher Ranking</h2>

        {/* start alert */}
        <div
          className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-1/3 m-auto"
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
            <span className="font-medium">Message!</span> Teacher ranking by
            SMIT students.
          </div>
        </div>
        {/* end alert */}

        <div className="w-3/4 mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {teacher &&
              teacher.map((t, ind) => {
                return (
                  <div
                    key={ind}
                    className="py-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-center items-center mb-6">
                      <img
                        className="rounded-full w-36 h-36"
                        src={NoImage}
                        alt="image description"
                      />
                    </div>
                    {t.rating}

                    {t &&
                      t.map((item, i) => {
                        return (
                          <>
                            <p key={i} className="text-center font-medium">
                              {item.teacherId.teacher}
                            </p>
                            <p className="text-center text-blue-400 font-normal">
                              Rank: {item.rating}
                            </p>
                          </>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </AnimationPage>
    </>
  );
}
