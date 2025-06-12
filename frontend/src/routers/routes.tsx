import { createBrowserRouter } from "react-router";
import CreatePage from "../pages/CreatePage";
import EditPage from "../pages/EditPage";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import ErrorMessage from "../components/ErrorMessage";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorMessage />,
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
        path: "/note/:id",
        element: <DetailPage />,
      },
    ],
  },
]);
