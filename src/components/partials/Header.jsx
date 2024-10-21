import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header() {
  const navigate = useNavigate();
   function logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await axios.post("/api/logout");
            localStorage.removeItem("access_token");
            Swal.fire({
              title: "Logged Out!",
              text: "You are logged out successfully",
              icon: "success",
            });
      
            navigate("/login");
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something Went Wrong. Logout Failed!",
            });
          }
      }
    });
  }
  return (
    <div className="w-100 d-flex justify-content-between mb-5">
      <div className="rounded p-3 bg-info-subtle">
        <span className="fw-bold">Teacher Portal</span>
      </div>
      <div>
        <button
          type="button"
          onClick={logout}
          className="border-0 bg-transparent"
        >
          <span className="fw-bold fs-4">Logout</span>
        </button>
      </div>
    </div>
  );
}
