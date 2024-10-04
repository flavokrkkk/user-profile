import { HomePage } from "@pages/home-page";
import { ProfilePage } from "@pages/profile-page";
import ReportsPage from "@pages/reports-page";
import { ERoutesNames } from "@utils/routes-name";
import { Layout } from "@views/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ERoutesNames.HOME,
        element: <HomePage />,
      },
      {
        path: ERoutesNames.PROFILE_DEATILS,
        element: <ProfilePage />,
      },
      {
        path: ERoutesNames.CATCH_ALL,
        element: <Navigate to={ERoutesNames.HOME} replace />,
      },
      {
        path: ERoutesNames.CATCH_ALL,
        element: <Navigate to={ERoutesNames.HOME} replace />,
      },
      {
        path: ERoutesNames.REPORTS,
        element: <ReportsPage />,
      },
    ],
  },
]);
