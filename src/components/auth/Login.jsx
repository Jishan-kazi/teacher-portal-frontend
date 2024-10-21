import axios from "axios";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    try {
      setIsLoading(true);
      const baseUrl = "http://127.0.0.1:8000";
      await axios.get(baseUrl + "/sanctum/csrf-cookie");

      let response = await axios.post(baseUrl + "/api/login", data);
      localStorage.setItem("access_token", response.data.data.access_token);
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleLogin}
        className="w-25 border p-5 shadow bg-body-tertiary rounded"
      >
        <h4 className="mb-4">Login</h4>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputEmail1" className="mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="exampleInputPassword1" className="mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            Login Successfull!
          </div>
        )}

        {isLoading ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        )}
      </form>
    </div>
  );
}

export function loader() {
    const token = localStorage.getItem('access_token');
    if (token) {
        return redirect('/');
    }

    return true;
}
