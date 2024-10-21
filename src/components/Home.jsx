import axios from "axios";
import { json, redirect, useLoaderData } from "react-router-dom";
import StudentList from "./StudentList";
import Header from "./partials/Header";

export default function Home() {
  let initialStudentsData = useLoaderData();
  return (
    <div className="w-50 mx-auto d-flex flex-column align-items-center p-5 bg-body-tertiary">
      <Header />
      <StudentList initialStudentsData={initialStudentsData} />
    </div>
  );
}

export async function loader() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    return redirect("/login");
  }

  try {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

    const students = await axios.get("/api/students");

    return json(students, 200);
  } catch (error) {
    throw new Response(
      JSON.stringify({ message: "Problem in fetching data" }),
      { status: 500 }
    );
  }
}
