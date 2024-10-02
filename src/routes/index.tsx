import { ERoutesNames } from "@utils/routes-name";
import Layout from "@views/layout";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ERoutesNames.HOME,
        element: <div>home</div>,
      },
      {
        path: ERoutesNames.PROFILE,
        element: <div>profile</div>,
      },
    ],
  },
]);
