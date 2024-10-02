import { createBrowserRouter } from "react-router-dom";
import Layout from "../views/layout";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <div>home</div>,
      },
      {
        path: "profile",
        element: <div>profile</div>,
      },
    ],
  },
]);
