import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
import Navbar from "../Dashboard/Navbar";
import NoImage from "./noimages.png";
import axios from "axios";
import AnimationPage from "./AnimationPage";

export default function Ranking() {
  const [teacher, setTeacher] = useState([]);
  const [totalStudent, setTotalStudent] = useState([]);

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/rank");
      const data = await res.data;
      console.log("test : ", data["comments"]);
      console.log("secnd : ", data["count"]);

      setTeacher(data["comments"]);
      setTotalStudent(data["count"]);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
    // countTeacher();
  }, []);

  const tname = [];
  const final = [];

  let rank1 = 0;
  let rank2 = 0;
  let rank3 = 0;
  let rank4 = 0;
  let cont = 0;

  let i = 0,
    j = 0;
  let name = "";
  let finalCount = 0;

  for (i = 0; i < teacher.length; i++) {
    rank1 = 0;
    rank2 = 0;
    rank3 = 0;
    rank4 = 0;
    cont = totalStudent[i].count;
    console.log("total : ", totalStudent[i].count);

    for (j = 0; j < teacher[i].length; j++) {
      name = teacher[i][j].teacherId.teacher;
      // console.log("xyz: ", teacher[i][j]);
      // final.push(teacher[i][j].teacherId._id);

      if (name == teacher[i][j].teacherId.teacher) {
        if (teacher[i][j].rating == "01-Excellent") {
          rank1++;
        }
        if (teacher[i][j].rating == "02-Best") {
          rank2++;
        }
        if (teacher[i][j].rating == "03-Normal") {
          rank3++;
        }
        if (teacher[i][j].rating == "04-Unsatisfy") {
          rank4++;
        }
      }
    }
    console.log("lenghth: ", cont);
    tname.push({
      name: name,
      r1: rank1,
      r2: rank2,
      r3: rank3,
      r4: rank4,
      totstudent: cont,
    });
  }

  return (
    <>
      <Navbar />
      <AnimationPage>
        <h2 className="text-3xl font-medium mt-7 text-center">
          Teacher Ranking Summary
        </h2>

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

        <div className="w-4/5 mx-auto">
          <div className="grid grid-cols-4 gap-4">
            {tname &&
              tname.map((t, ind) => {
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

                    <p className="text-center font-medium mb-3">{t.name}</p>
                    <p className="text-center text-sm text-blue-500">
                      Total Student: {t.totstudent}
                    </p>

                    {/* PERCENTAGE */}
                    <div className="flex justify-between mx-3 mt-2">
                      <p className="text-center text-xs font-medium text-green-800">
                        Excel{" "}
                        {(t.r1 / t.totstudent) * 100 == 0
                          ? ((t.r1 / t.totstudent) * 100).toFixed(0)
                          : ((t.r1 / t.totstudent) * 100).toFixed(2)}
                        %
                      </p>
                      <p className="text-center text-xs font-medium text-red-800">
                        Best{" "}
                        {(t.r2 / t.totstudent) * 100 == 0
                          ? ((t.r2 / t.totstudent) * 100).toFixed(0)
                          : ((t.r2 / t.totstudent) * 100).toFixed(2)}
                        %
                      </p>

                      <p className="text-center text-xs font-medium text-blue-800">
                        Normal{" "}
                        {(t.r3 / t.totstudent) * 100 == 0
                          ? ((t.r3 / t.totstudent) * 100).toFixed(0)
                          : ((t.r3 / t.totstudent) * 100).toFixed(2)}
                        %
                      </p>
                      <p className="text-center text-xs font-medium text-slate-800">
                        Unsatisfy{" "}
                        {(t.r4 / t.totstudent) * 100 == 0
                          ? ((t.r4 / t.totstudent) * 100).toFixed(0)
                          : ((t.r4 / t.totstudent) * 100).toFixed(2)}
                        %
                      </p>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="ml-3">
                        {/* <span className="text-green-600">Excellant:</span> */}
                        <span className="inline-flex border border-green-400 items-center py-1.5 px-3 rounded-md text-sm font-medium  text-green-800">
                          Excellant
                        </span>
                      </p>
                      <p className="mr-3">
                        <span className="inline-flex border border-green-400 items-center py-1.5 px-3 rounded-md text-xs font-medium  text-green-800">
                          {" "}
                          {t.r1}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="ml-3">
                        {/* <span className="text-green-600">Excellant:</span> */}
                        <span className="inline-flex border border-red-300 items-center py-1.5 px-3 rounded-md text-sm font-medium  text-red-800">
                          Best
                        </span>
                      </p>
                      <p className="mr-3">
                        <span className="inline-flex border border-red-300 items-center py-1.5 px-3 rounded-md text-xs font-medium text-red-800">
                          {" "}
                          {t.r2}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="ml-3">
                        {/* <span className="text-green-600">Excellant:</span> */}
                        <span className="inline-flex border border-blue-300 items-center py-1.5 px-3 rounded-md text-sm font-medium text-blue-800">
                          Normal
                        </span>
                      </p>
                      <p className="mr-3">
                        <span className="inline-flex border border-blue-300 items-center py-1.5 px-3 rounded-md text-xs font-medium text-blue-800">
                          {" "}
                          {t.r3}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-between mt-3">
                      <p className="ml-3">
                        {/* <span className="text-green-600">Excellant:</span> */}
                        <span className="inline-flex border border-slate-300 items-center py-1.5 px-3 rounded-md text-sm font-medium  text-slate-800">
                          Unsatisfy
                        </span>
                      </p>
                      <p className="mr-3">
                        <span className="inline-flex border border-slate-300 items-center py-1.5 px-3 rounded-md text-xs font-medium text-slate-800">
                          {" "}
                          {t.r4}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <p className="my-9">&nbsp;</p>
      </AnimationPage>
    </>
  );
}
