import { createBrowserRouter } from "react-router-dom";
import Login, { loader as loginLoader } from "../components/auth/Login";
import Home, { loader } from "../components/Home";
import Error from "../components/exception/Error";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loader,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader
  },
]);

export default router;
