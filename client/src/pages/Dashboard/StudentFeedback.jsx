import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

import jsPDF from "jspdf";
import "jspdf-autotable";

import axios from "axios";
import dayjs from "dayjs";

export default function StudentFeedback() {
  const [allComment, setAllComment] = useState([]);

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
  }, []);

  const getPDF = () => {
    console.log("pdf");

    const doc = new jsPDF({
      orientation: "landscape",
    });
    var totalPagesExp = "{total_pages_count_string}";

    doc.autoTable({
      html: "#my-table",
      styles: { fontSize: 8 },
      margin: { top: 22, left: 10, right: 10 },
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(10, 10, "Saylani Mass IT Training Program");
        doc.setFontSize(15);
        doc.text(10, 18, "All Students Feedback Reports");

        doc.setFontSize(9);
        let dt = new Date();
        doc.text(
          260,
          18,
          "Print: " +
            dt.getDate() +
            "-" +
            (dt.getMonth() + 1) +
            "-" +
            dt.getFullYear()
        );

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save("all_student_feedback.pdf");

    // ----------------- End PDF -------------------
  };

  return (
    <>
      <Navbar />

      <h2 className="text-2xl mt-4 font-semibold text-center">
        All Student Feedback
      </h2>

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

      <button
        type="button"
        onClick={getPDF}
        className="bg-white text-sm font-normal duration-300 text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 rounded-md ml-5 py-2 px-5"
      >
        Get Print
      </button>

      {/* table section start */}

      <section>
        <div className="border rounded-lg mx-5 mt-5 overflow-hidden shadow-lg">
          <table
            id="my-table"
            className="w-full text-sm text-left rtl:text-right text-gray-500"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-900 rounded-lg text-white">
                <th scope="col" className="pl-5 w-10 py-3">
                  S #
                </th>

                <th scope="col" className="pl-5 py-3">
                  TEACHER
                </th>
                <th scope="col" className="pl-5 py-3">
                  STUDENT NAME
                </th>
                <th scope="col" className="pl-5 py-3">
                  COMMENT
                </th>
                <th scope="col" className="py-3 pr-10">
                  CREATED
                </th>
                <th scope="col" className="pr-5 w-24 py-3">
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
                      <td className="pl-3 text-center py-3">{ind + 1}</td>

                      <td className="pl-3 text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {coment.teacherId.teacher}
                      </td>

                      <td className="pl-3 text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {coment.studentId.sname}
                      </td>

                      <td className="pl-5 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {coment.comments}
                      </td>

                      <td className="py-3">
                        {dayjs(coment.createdAt).format("DD-MMM-YYYY")}
                      </td>
                      <td className="mr-3 py-3">{coment.rating}</td>
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
