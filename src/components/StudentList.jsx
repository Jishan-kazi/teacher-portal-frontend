import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import AddModal from "./AddModal";
import Pagination from "./elements/Pagination";

export default function StudentList({initialStudentsData}) {
  const [students, setStudents] = useState(initialStudentsData);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  function handleDelete(deleteId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("/api/students/" + deleteId, {});

          Swal.fire({
            title: "Deleted!",
            text: "Student has been deleted.",
            icon: "success",
          });

          getStudentsData();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  }

  async function updateStudent(studentId) {
    try {
      setError("");

      let dataToUpdate = {
        name: document.getElementById("name" + studentId).value,
        subject: document.getElementById("subject" + studentId).value,
        marks: document.getElementById("marks" + studentId).value,
      };

      await axios.put("/api/students/" + studentId, dataToUpdate);
      Swal.fire({
        title: "Updated!",
        text: "Student data updated successfully.",
        icon: "success",
      });

      setEditId(null);
      getStudentsData();
    } catch (err) {
      if (err.status === 422) {
        const errors = err?.response?.data?.errors;
        for (var key in errors) {
          if (errors.hasOwnProperty(key)) {
            setError(errors[key][0]);
            break;
          }
        }
      } else {
        setError("Something Went Wrong");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  async function getStudentsData(url = "/api/students") {
    const res = await axios.get(url);
    setStudents(res);
  }

  function assignStudentData(data) {
    setStudents(data);
  }

  function handleError(err) {
    setError(err);
  }

  return (
    <>
      <h3 className="mb-3">All Students</h3>

      {students?.data?.data?.data?.length === 0 ? (
        <div className="d-flex justify-content-center bg-light p-2">
          <span>Data not available</span>
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Marks</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students?.data?.data?.data?.map((element) => {
                return (
                  <tr key={element.name}>
                    <th scope="row">
                      {editId === element.id ? (
                        <input
                          type="text"
                          className="form-control"
                          id={`name${element.id}`}
                          defaultValue={element.name}
                          required
                        />
                      ) : (
                        element.name
                      )}
                    </th>
                    <td>
                      {editId === element.id ? (
                        <input
                          type="text"
                          className="form-control"
                          id={`subject${element.id}`}
                          defaultValue={element.subject}
                          required
                        />
                      ) : (
                        element.subject
                      )}
                    </td>
                    <td>
                      {editId === element.id ? (
                        <input
                          type="number"
                          className="form-control"
                          id={`marks${element.id}`}
                          defaultValue={element.marks}
                          required
                        />
                      ) : (
                        element.marks
                      )}
                    </td>
                    <td>
                      {/* save icon */}
                      {editId === element.id && (
                        <button
                          type="button"
                          onClick={() => updateStudent(element.id)}
                          className="border-0 bg-transparent"
                        >
                          <span className="me-2 text-success">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-check"
                            >
                              <path d="M20 6 9 17l-5-5" />
                            </svg>
                          </span>
                        </button>
                      )}

                      {/* Cross icon (to close edit mode)  */}
                      {editId === element.id && (
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          className="border-0 bg-transparent"
                        >
                          <span className="me-2 text-danger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-x"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </span>
                        </button>
                      )}

                      {/* edit icon */}
                      {editId !== element.id && (
                        <button
                          type="button"
                          onClick={() => setEditId(element.id)}
                          className="border-0 bg-transparent"
                        >
                          <span className="me-2 text-warning">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-pencil"
                            >
                              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </span>
                        </button>
                      )}

                      {/* delete icon */}
                      {editId !== element.id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(element.id)}
                          className="border-0 bg-transparent"
                        >
                          <span className="text-danger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            links={students?.data?.data?.links}
            currentPage={students?.data?.data?.current_page}
            lastPage={students?.data?.data?.last_page}
            getStudentsData={getStudentsData}
            assignStudentData={assignStudentData} 
            handleError={handleError}
          />

          {error && (
            <div className="w-100">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
        </>
      )}

      <AddModal getStudentsData={getStudentsData} />
    </>
  );
}
