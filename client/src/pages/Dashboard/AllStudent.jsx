import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AllStudent() {
  const [allStudent, setAllStudent] = useState([]);

  async function getData() {
    try {
      const res = await axios("http://localhost:5000/student");
      const data = await res.data;
      console.log(data);
      setAllStudent(data);
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
        doc.text(10, 18, "All Students Reports");

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
    doc.save("all_student_report.pdf");

    // ----------------- End PDF -------------------
  };

  return (
    <>
      <Navbar />
      <h2 className="text-2xl text-center font-medium mt-9 mb-5 text-slate-800">
        All Student Record
      </h2>

      <button
        type="button"
        onClick={getPDF}
        className="bg-white text-sm font-normal duration-300 text-blue-500 hover:text-white hover:bg-blue-500 border border-blue-500 rounded-md ml-5 py-2 px-5"
      >
        Get Print
      </button>

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
                  STUDENT NAME
                </th>
                <th scope="col" className="pl-5 py-3">
                  FATHER NAME
                </th>

                <th scope="col" className="py-3 pr-10">
                  CREATED
                </th>
                <th scope="col" className="pr-5 py-3">
                  TEACHER
                </th>
                <th scope="col" className="pr-5 w-24 py-3">
                  BATCH
                </th>
              </tr>
            </thead>
            <tbody>
              {allStudent &&
                allStudent.map((student, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                    >
                      <td className="pl-3 text-center py-3">{ind + 1}</td>

                      <td className="pl-3 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.sname}
                      </td>

                      <td className="pl-3 text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.fname}
                      </td>

                      <td className="py-3">
                        {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                      </td>
                      <td className="mr-3 py-3">
                        {student.teacher_id.teacher}
                      </td>
                      <td className="mr-3 py-3">{student.batch}</td>
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
