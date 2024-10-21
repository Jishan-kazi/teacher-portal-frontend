import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  let title = "An Error Occurred";
  let message = "Something Went Wrong";
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    message = "Not Found";
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="alert alert-danger w-25" role="alert">
        <h4>{title}</h4>
        <span>{message}</span>
      </div>
    </div>
  );
}
