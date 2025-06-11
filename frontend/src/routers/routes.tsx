import { createBrowserRouter } from "react-router";
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
      {
        path: "/notes/:id",
        element: <DetailPage />,
      },
    ],
  },
]);
