import { useForm } from "react-hook-form";
// import Navbar from "../components/Navbar";
import Navbar from "./Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimationPage from "./AnimationPage";

const StudentForm = () => {
  const navigate = useNavigate();
  const [allTeacher, setAllTeacher] = useState([]);
  // const id = useParams();
  // console.log(id);

  async function getData() {
    try {
      const res = await axios("https://server-theta-puce.vercel.app/teacher");
      const data = await res.data;
      setAllTeacher(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.teacher == "Select Teacher") {
      alert("Please seleect a teacher");
    } else {
      axios
        .post("http://localhost:5000/student", {
          sname: data.sname,
          fname: data.fname,
          email: data.email,
          batch: data.batch,
          mobile: data.mobile,
          cnic: data.cnic,
          address: data.address,
          password: data.password,
          teacher_id: data.teacher,
          rollno: data.roll,
          course: data.course,
        })
        .then(
          (response) => {
            console.log(response);
            // alert("Signup Successfully!");
            reset();
            toast.success("Student inserted successfully!");
            navigate("/dashboard/student");
          },
          (error) => {
            console.log(error.message);
          }
        );
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <AnimationPage>
        <h1 className="text-3xl text-center text-slate-800 font-semibold mt-10 mb-10">
          Student Registration
        </h1>
        {/* start alert */}
        <div
          className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-3/4 mx-auto"
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
            <span className="font-medium">Important Message!</span> Please fill
            the student form carefully for registration.
          </div>
        </div>
        {/* end alert */}

        <form
          className="lg:col-span-2 mt-3 mb-10"
          onSubmit={handleSubmit(onSubmit)}
          // onClick={()=> onSubmit}
        >
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-32 md:grid-cols-9">
            <div className="md:col-span-3">
              <label>Student Name</label>
              <input
                type="text"
                {...register("sname", { required: true })}
                // name="address"
                // id="address"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                // value=""
                placeholder="Enter Student name"
              />
              {errors.sname && (
                <p className="text-red-500">Full name is required.</p>
              )}
            </div>

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

            <div className="md:col-span-3">
              <label>Father Name </label>
              <input
                type="text"
                {...register("fname", { required: true })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Father Name"
              />
              {errors.fname && <p className="text-red-500">Father Name.</p>}
            </div>

            <div className="md:col-span-3">
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

            <div className="md:col-span-3">
              <label>Mobile No</label>
              <input
                type="text"
                {...register("mobile", { required: true, minLength: 12 })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter Mobile No"
              />
              {errors.mobile && (
                <p className="text-red-500">Mobile Number Required.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <label>CNIC</label>
              <input
                type="text"
                {...register("cnic", { required: true })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter CNIC No"
              />
              {errors.cnic && (
                <p className="text-red-500">CNIC is Requidred.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Batch</label>
              <input
                type="number"
                {...register("batch", { required: true, minLength: 2 })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter Batch No"
              />
              {errors.batch && (
                <p className="text-red-500">Enter the Batch Number.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Roll No</label>
              <input
                type="text"
                {...register("roll", { required: true, minLength: 6 })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter Roll No"
              />
              {errors.roll && <p className="text-red-500">Roll No Required.</p>}
            </div>

            <div className="md:col-span-3">
              <label>Address</label>
              <input
                type="text"
                {...register("address", { required: true, minLength: 6 })}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter Address"
              />
              {errors.address && (
                <p className="text-red-500">Enter the permenant address.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Select Teacher</label>
              <select
                {...register("teacher")}
                className="bg-gray-50 border h-10 mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"Select Teacher"}>{"Select Teacher"}</option>
                {allTeacher.map((teacher, ind) => {
                  return (
                    <option key={ind} value={teacher._id}>
                      {teacher.teacher}
                    </option>
                  );
                })}
              </select>
              {errors.teacher && (
                <p className="text-red-500">Select a teacher.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <label>Select any course</label>
              <select
                {...register("course")}
                className="bg-gray-50 border h-10 mt-1 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphics Designing">Graphics Designing</option>
                <option value="CCNA">CCNA</option>
                <option value="Python">Python</option>
              </select>
              {errors.course && (
                <p className="text-red-500">Select any course.</p>
              )}
            </div>

            <div className="md:col-span-3">
              <button
                // disabled={!pImage}
                className={
                  // !pImage
                  //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                  `bg-slate-800 mt-6 hover:bg-slate-700 text-white font-medium py-2 px-2 text-sm rounded`
                }
              >
                ADD STUDENT
              </button>
            </div>
          </div>
        </form>
      </AnimationPage>
    </>
  );
};

export default StudentForm;
