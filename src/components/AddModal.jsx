import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddModal({getStudentsData}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddStudent(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dataToSave = Object.fromEntries(fd.entries());

    try {
      setIsLoading(true);
      setError("");
      await axios.post("/api/students", dataToSave);
      Swal.fire({
        title: "Added!",
        text: "Student has been saved successfully.",
        icon: "success",
      });
      getStudentsData();
      document.getElementById('addStudentModalCloseBtn').click();
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
        setError("Unable to add student");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-100 mt-3">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Student
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Student
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="addStudentModalCloseBtn"
              ></button>
            </div>

            <div className="modal-body p-4">
              <form onSubmit={handleAddStudent}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="name"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-semibold"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="subject"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    for="exampleInputPassword2"
                    className="form-label fw-semibold"
                  >
                    Marks
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword2"
                    name="marks"
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {isLoading && (
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}

                {!isLoading && (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
